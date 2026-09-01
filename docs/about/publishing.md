# Publishing

The repository treats publishing as a reproducible transformation of reviewed source.

## HTML with Zensical

Zensical is the preferred renderer because it supports explicit navigation, a searchable static site, and a modern responsive theme. The checked-in configuration keeps the local preview and CI build aligned.

```bash
zensical build --strict
```

Version 0.0.23 currently warns that strict mode is unsupported. The command is retained for forward compatibility, but the independent documentation validator—not that flag—is the required link, anchor, structure, and navigation gate.

## Word and PDF

The export script reads the explicit navigation list so portable outputs follow the same order as the site. It applies a restrained document style, real heading levels, descriptive link text, and a running footer with dynamic **Page X of Y** fields. LibreOffice preserves those page numbers when it creates the PDF.

```bash
python scripts/export_handbook.py
```

CI uses LibreOffice to convert the generated Word file to PDF. Both files are checked for existence and plausible size before publication.

The website, Word handbook, and PDF handbook are three presentations of the same reviewed Markdown source. Authors do not update any of them separately. After an approved Markdown change is merged, the workflow rebuilds the site, generates Word, converts Word to PDF, verifies all three outputs, and publishes them together.

The training PowerPoint follows a related path: Jay's training book references selected maintained sections and adds training-only content, then the generator creates the `.pptx`. The deck is published output, not another source file to edit.

<div class="hero-actions" markdown>
[Download the Word handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.docx){ .md-button }
[Download the PDF handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.pdf){ .md-button }
[Download the training PowerPoint](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/jays-greenhouse-training.pptx){ .md-button }
</div>

## Renderer-Independent Gates

A replacement renderer is acceptable only if the release continues to verify navigation completeness, target files, anchors, accessible structure, responsive layout, and portable outputs. Tool choice can evolve. The acceptance criteria stay explicit.
