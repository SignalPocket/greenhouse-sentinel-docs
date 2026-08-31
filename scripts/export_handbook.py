#!/usr/bin/env python3
"""Build a styled Word handbook from the explicit Zensical navigation."""

from __future__ import annotations

import re
import tomllib
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUT = ROOT / "deliverables" / "greenhouse-sentinel-handbook.docx"
PRIMARY = RGBColor(7, 94, 84)
ACCENT = RGBColor(180, 83, 9)
TEXT = RGBColor(22, 48, 43)


def flatten_nav(items):
    result = []
    for item in items:
        if isinstance(item, str):
            result.append(item)
        else:
            for value in item.values():
                result.extend(flatten_nav(value) if isinstance(value, list) else [value])
    return result


def shade(cell, fill):
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), fill)
    cell._tc.get_or_add_tcPr().append(shd)


def add_inline(paragraph, text):
    parts = re.split(r"(`[^`]+`|\*\*[^*]+\*\*|\[[^]]+\]\([^)]+\))", text)
    for part in parts:
        if not part:
            continue
        if part.startswith("`"):
            run = paragraph.add_run(part[1:-1]); run.font.name = "Consolas"
        elif part.startswith("**"):
            run = paragraph.add_run(part[2:-2]); run.bold = True
        elif part.startswith("["):
            match = re.match(r"\[([^]]+)\]\([^)]+\)", part)
            run = paragraph.add_run(match.group(1) if match else part); run.font.color.rgb = PRIMARY; run.underline = True
        else:
            paragraph.add_run(part)


def add_page(doc, path):
    lines = path.read_text(encoding="utf-8").splitlines()
    in_code = False
    table_lines = []
    for raw in lines:
        line = raw.rstrip()
        if line.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            p = doc.add_paragraph(style="Code"); p.add_run(line)
            continue
        if line.startswith("<a id=") or line.startswith("<div") or line.startswith("</div"):
            continue
        if line.startswith("|"):
            table_lines.append(line)
            continue
        if table_lines:
            rows = [[c.strip() for c in r.strip("|").split("|")] for r in table_lines]
            if len(rows) > 2:
                table = doc.add_table(rows=1, cols=len(rows[0])); table.autofit = False
                for i, value in enumerate(rows[0]):
                    table.rows[0].cells[i].text = value; shade(table.rows[0].cells[i], "075E54")
                    for run in table.rows[0].cells[i].paragraphs[0].runs: run.font.color.rgb = RGBColor(255,255,255); run.bold = True
                for values in rows[2:]:
                    cells = table.add_row().cells
                    for i, value in enumerate(values): cells[i].text = value
                for row in table.rows:
                    for cell in row.cells: cell.width = Inches(6.5 / len(row.cells))
            table_lines = []
        if not line or line.startswith("!!!"):
            continue
        heading = re.match(r"^(#{1,6})\s+(.+)$", line)
        if heading:
            level = min(len(heading.group(1)), 3)
            if level == 1 and len(doc.paragraphs) > 4: doc.add_page_break()
            doc.add_heading(heading.group(2), level=level)
        elif re.match(r"^\d+\.\s+", line):
            p = doc.add_paragraph(style="List Number"); add_inline(p, re.sub(r"^\d+\.\s+", "", line))
        elif line.startswith("- "):
            p = doc.add_paragraph(style="List Bullet"); add_inline(p, line[2:])
        elif line.startswith("[!") or line.startswith("<"):
            continue
        else:
            p = doc.add_paragraph(); add_inline(p, line)


def build():
    config = tomllib.loads((ROOT / "zensical.toml").read_text(encoding="utf-8"))
    doc = Document()
    section = doc.sections[0]
    section.top_margin = section.bottom_margin = Inches(0.8)
    section.left_margin = section.right_margin = Inches(0.9)
    styles = doc.styles
    normal = styles["Normal"]; normal.font.name = "Aptos"; normal.font.size = Pt(10.5); normal.font.color.rgb = TEXT
    normal.paragraph_format.space_after = Pt(7); normal.paragraph_format.line_spacing = 1.15
    for name, size in (("Title", 30), ("Heading 1", 21), ("Heading 2", 15), ("Heading 3", 12)):
        style = styles[name]; style.font.name = "Aptos Display"; style.font.size = Pt(size); style.font.bold = True; style.font.color.rgb = PRIMARY
        style.paragraph_format.space_before = Pt(12); style.paragraph_format.space_after = Pt(6); style.paragraph_format.keep_with_next = True
    code = styles.add_style("Code", WD_STYLE_TYPE.PARAGRAPH); code.font.name = "Consolas"; code.font.size = Pt(8.5)
    code.paragraph_format.left_indent = Inches(0.2); code.paragraph_format.space_after = Pt(2)

    title = doc.add_paragraph(style="Title"); title.add_run("Greenhouse Sentinel")
    subtitle = doc.add_paragraph(); subtitle.alignment = WD_ALIGN_PARAGRAPH.LEFT
    run = subtitle.add_run("Product handbook and docs-as-code portfolio demonstration"); run.font.size = Pt(15); run.font.color.rgb = ACCENT
    doc.add_paragraph("Fictional product · Real documentation workflow · Katie Kearns · 2026")
    doc.add_paragraph("This public sample contains no customer, proprietary, export-controlled, or classified information.")
    doc.add_page_break()

    footer = section.footer.paragraphs[0]; footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer.add_run("Greenhouse Sentinel · Portfolio demonstration · Katie Kearns")
    for rel in flatten_nav(config["project"]["nav"]): add_page(doc, DOCS / rel)
    OUT.parent.mkdir(exist_ok=True)
    doc.core_properties.title = "Greenhouse Sentinel handbook"
    doc.core_properties.author = "Katie Kearns"
    doc.core_properties.subject = "Public docs-as-code portfolio demonstration"
    doc.save(OUT)
    print(OUT)


if __name__ == "__main__": build()

