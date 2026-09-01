#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_BOOK = path.join(ROOT, "training", "operator-training-book.json");
const DEFAULT_OUTPUT = path.join(ROOT, "deliverables", "greenhouse-sentinel-operator-training.pptx");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function cleanInlineMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function parseSection(markdown, anchor) {
  const lines = markdown.split(/\r?\n/);
  let start = -1;
  let level = 7;

  for (let index = 0; index < lines.length; index += 1) {
    const explicit = lines[index].match(/^<a id=["']([^"']+)["']><\/a>$/);
    const heading = lines[index].match(/^(#{1,6})\s+(.+)$/);
    if (explicit?.[1] === anchor) {
      const nextHeading = lines.slice(index + 1).findIndex((line) => /^#{1,6}\s+/.test(line));
      if (nextHeading >= 0) {
        start = index + 1 + nextHeading;
        level = lines[start].match(/^(#{1,6})/)?.[1].length ?? 7;
      }
      break;
    }
    if (heading && slugify(heading[2]) === anchor) {
      start = index;
      level = heading[1].length;
      break;
    }
  }

  if (start < 0) throw new Error(`Section #${anchor} was not found`);
  const heading = cleanInlineMarkdown(lines[start].replace(/^#{1,6}\s+/, ""));
  const body = [];
  let inCode = false;
  let inAdmonition = false;
  for (let index = start + 1; index < lines.length; index += 1) {
    const next = lines[index].match(/^(#{1,6})\s+/);
    if (next && next[1].length <= level) break;
    if (lines[index].startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (lines[index].startsWith("!!!")) {
      inAdmonition = true;
      continue;
    }
    if (inAdmonition && /^\s{4}/.test(lines[index])) continue;
    inAdmonition = false;
    if (/^(<a\s|\|\s*---)/.test(lines[index])) continue;
    const value = cleanInlineMarkdown(
      lines[index]
        .replace(/^\d+\.\s+/, "")
        .replace(/^[-*]\s+/, "")
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .replace(/\s*\|\s*/g, " — "),
    );
    if (value) body.push(value);
  }
  return { title: heading, content: body };
}

async function resolveSlides(book) {
  const slides = [];
  for (const entry of book.slides) {
    if (!entry.source) {
      slides.push(entry);
      continue;
    }
    const [relativePath, anchor] = entry.source.split("#");
    if (!relativePath || !anchor) throw new Error(`Invalid source reference: ${entry.source}`);
    const absolutePath = path.resolve(ROOT, relativePath);
    if (!absolutePath.startsWith(`${ROOT}${path.sep}`)) throw new Error(`Source is outside the repository: ${entry.source}`);
    slides.push({
      ...parseSection(await fs.readFile(absolutePath, "utf8"), anchor),
      notes: entry.notes,
    });
  }
  return slides;
}

function addText(slide, name, text, position, style) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = style;
  return shape;
}

function addSpeakerNotes(slide, notes) {
  if (!notes) return;
  slide.speakerNotes.textFrame.setText(notes);
  slide.speakerNotes.setVisible(true);
}

function addTitleSlide(presentation, book) {
  const slide = presentation.slides.add();
  slide.background.fill = "#FFFFFF";
  addText(slide, "eyebrow", "GREENHOUSE SENTINEL", { left: 48, top: 44, width: 440, height: 40 }, { fontSize: 20, bold: true, color: "#075E54" });
  addText(slide, "deck-title", book.title, { left: 48, top: 210, width: 1050, height: 210 }, { fontSize: 58, bold: true, color: "#000000" });
  addText(slide, "deck-subtitle", book.subtitle, { left: 48, top: 500, width: 820, height: 90 }, { fontSize: 28, color: "#34413E" });
  addSpeakerNotes(slide, book.notes);
}

function addContentSlide(presentation, item, slideNumber) {
  const slide = presentation.slides.add();
  slide.background.fill = "#FFFFFF";
  addText(slide, `slide-${slideNumber}-title`, item.title, { left: 48, top: 44, width: 1130, height: 86 }, { fontSize: 40, bold: true, color: "#000000" });
  const rule = slide.shapes.add({ geometry: "rect", name: `slide-${slideNumber}-rule`, position: { left: 48, top: 145, width: 1184, height: 4 }, fill: "#6DCBF4", line: { style: "solid", fill: "none", width: 0 } });
  rule.decorative = true;
  item.content.slice(0, 6).forEach((line, index) => {
    addText(
      slide,
      `slide-${slideNumber}-item-${index + 1}`,
      `• ${line}`,
      { left: 72, top: 190 + index * 68, width: 1090, height: 58 },
      { fontSize: 22, color: "#16302B" },
    );
  });
  addText(slide, `slide-${slideNumber}-footer`, String(slideNumber), { left: 1160, top: 660, width: 72, height: 26 }, { fontSize: 14, color: "#67736F", alignment: "right" });
  addSpeakerNotes(slide, item.notes);
}

async function main() {
  const bookPath = path.resolve(process.argv[2] ?? DEFAULT_BOOK);
  const outputPath = path.resolve(process.argv[3] ?? DEFAULT_OUTPUT);
  const book = JSON.parse(await fs.readFile(bookPath, "utf8"));
  const items = await resolveSlides(book);
  const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  addTitleSlide(presentation, book);
  items.forEach((item, index) => addContentSlide(presentation, item, index + 2));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPath);
  console.log(outputPath);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
