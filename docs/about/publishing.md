# Publishing

The repository treats publishing as a reproducible transformation of reviewed source.

## HTML with Zensical

Zensical is the preferred renderer because it supports explicit navigation, a searchable static site, and a modern responsive theme. The checked-in configuration keeps the local preview and CI build aligned.

```bash
zensical build --strict
```

Version 0.0.23 currently warns that strict mode is unsupported. The command is retained for forward compatibility, but the independent documentation validator—not that flag—is the required link, anchor, structure, and navigation gate.

## Word and PDF

The export script reads the explicit navigation list so portable outputs follow the same order as the site. It applies a restrained document style, real heading levels, a running footer, and link text that remains understandable outside the site.

```bash
python scripts/export_handbook.py
```

CI uses LibreOffice to convert the generated Word file to PDF. Both files are checked for existence and plausible size before they are uploaded as build artifacts.

## Renderer-independent gates

A replacement renderer is acceptable only if the release continues to verify navigation completeness, target files, anchors, accessible structure, responsive layout, and portable outputs. Tool choice can evolve; the acceptance criteria stay explicit.
