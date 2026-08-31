#!/usr/bin/env python3
"""Renderer-independent validation for navigation, links, anchors, and structure."""

from __future__ import annotations

import re
import sys
import tomllib
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
CONFIG = ROOT / "zensical.toml"
LINK_RE = re.compile(r"!?\[([^\]]*)\]\(([^)\s]+)(?:\s+['\"][^'\"]*['\"])?\)")
H_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)
EXPLICIT_ANCHOR_RE = re.compile(r'<a\s+id=["\']([^"\']+)["\']\s*></a>', re.I)
BAD_LINK_TEXT = {"click here", "here", "read more", "more"}


def slugify(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[`*_~]", "", text).strip().lower()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"[-\s]+", "-", text).strip("-")


def flatten_nav(items: list[object]) -> list[str]:
    paths: list[str] = []
    for item in items:
        if isinstance(item, str):
            paths.append(item)
        elif isinstance(item, dict):
            for value in item.values():
                paths.extend(flatten_nav(value) if isinstance(value, list) else [value])
    return paths


def anchors(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    found = set(EXPLICIT_ANCHOR_RE.findall(text))
    found.update(slugify(title) for marks, title in H_RE.findall(text) if title)
    return found


def main() -> int:
    errors: list[str] = []
    config = tomllib.loads(CONFIG.read_text(encoding="utf-8"))
    nav = flatten_nav(config["project"]["nav"])
    nav_set = set(nav)
    pages = {p.relative_to(DOCS).as_posix() for p in DOCS.rglob("*.md")}

    for target in nav:
        if not (DOCS / target).is_file():
            errors.append(f"navigation target does not exist: {target}")
    for page in sorted(pages - nav_set):
        errors.append(f"page is omitted from navigation: {page}")

    for rel in sorted(pages):
        path = DOCS / rel
        text = path.read_text(encoding="utf-8")
        validation_text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
        headings = H_RE.findall(text)
        h1_count = sum(1 for marks, _ in headings if len(marks) == 1)
        if h1_count != 1:
            errors.append(f"{rel}: expected exactly one H1; found {h1_count}")
        previous = 0
        for marks, title in headings:
            level = len(marks)
            if previous and level > previous + 1:
                errors.append(f"{rel}: heading level skips before '{title}'")
            previous = level

        for label, raw_target in LINK_RE.findall(validation_text):
            is_image = validation_text[max(0, validation_text.find(f"[{label}]") - 1):validation_text.find(f"[{label}]")] == "!"
            if is_image and not label.strip():
                errors.append(f"{rel}: image has empty alternative text")
            if not is_image and label.strip().lower() in BAD_LINK_TEXT:
                errors.append(f"{rel}: non-descriptive link text '{label}'")
            if raw_target.startswith(("http://", "https://", "mailto:")):
                continue
            file_part, sep, fragment = raw_target.partition("#")
            target_path = (path.parent / unquote(file_part)).resolve() if file_part else path
            if not target_path.is_file():
                errors.append(f"{rel}: missing link target '{raw_target}'")
                continue
            if fragment and target_path.suffix.lower() == ".md" and unquote(fragment) not in anchors(target_path):
                errors.append(f"{rel}: missing anchor '{fragment}' in {target_path.relative_to(DOCS)}")

    if errors:
        print("Documentation validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"Documentation validation passed: {len(pages)} pages, {len(nav)} navigation entries.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
