# Greenhouse Sentinel Documentation Demo

[![Docs checks](https://github.com/SignalPocket/greenhouse-sentinel-docs/actions/workflows/docs.yml/badge.svg)](https://github.com/SignalPocket/greenhouse-sentinel-docs/actions/workflows/docs.yml)

A public, self-documenting demonstration of a production-minded docs-as-code workflow by [Katie Kearns](https://github.com/SignalPocket). The subject is fictional. The workflow is real.

**Live documentation:** [signalpocket.github.io/greenhouse-sentinel-docs](https://signalpocket.github.io/greenhouse-sentinel-docs/)

Greenhouse Sentinel is a tiny fictional controller that monitors temperature, humidity, and soil moisture in a community greenhouse. Its limited scope makes the documentation quick to understand while leaving enough structure to demonstrate authoring, review, validation, publishing, and multi-format delivery.

## Why This Repository Exists

This repository is a portfolio artifact and reference implementation. It shows how a documentation team can keep content reviewable in Git, publish a searchable site, customize presentation without rewriting source, detect broken navigation and cross-references, and generate portable Word and PDF deliverables.

The documentation also explains itself. Start with **[How this repository works](docs/about/how-it-works.md)** to see each capability mapped to the file that implements it, then follow **[Build it from scratch](docs/about/build-from-scratch.md)** for the complete construction sequence.

## What It Demonstrates

| Capability | Where to inspect it |
| --- | --- |
| Markdown source and explicit navigation | `docs/` and `zensical.toml` |
| Stable anchors and cross-references | Named anchors in `docs/product/architecture.md` and links across guides |
| Preferred Zensical renderer | `zensical.toml` and the build commands below |
| Deterministic validation | `scripts/validate_docs.py` |
| Automated CI and artifact generation | `.github/workflows/docs.yml` |
| Accessibility-minded authoring | `docs/contributing/accessibility.md`, semantic source, visible focus styles |
| Replaceable brand layer | `docs/assets/stylesheets/brand-2026.css` and design tokens |
| Word and PDF outputs | `deliverables/` and `scripts/export_handbook.py` |

## Architecture

```text
Markdown source + configuration
          |
          +--> validation --> review gate / CI
          |
          +--> Zensical --> searchable HTML site
          |
          +--> export script --> Word --> PDF

Brand tokens affect presentation, not source meaning.
```

The renderer can change. The quality requirements do not. Explicit navigation, valid links and anchors, accessible structure, reproducible builds, and reviewable changes remain release gates.

## Build Locally

Requires Python 3.11 or newer.

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
python -m pip install -r requirements.txt
python scripts/validate_docs.py
zensical serve
```

Open `http://127.0.0.1:8000`. For a production build:

```bash
zensical build --strict
```

Generate the portable handbook:

```bash
python scripts/export_handbook.py
```

The script creates `deliverables/greenhouse-sentinel-handbook.docx`. PDF conversion is performed in CI with LibreOffice when available.

### Generate Jay's training deck

`training/jays-book.json` defines the slide order. Entries with a `source` value reference a heading in Katie's maintained Markdown, while entries with `title` and `content` hold Jay's training-only material.

```bash
node scripts/generate_training_deck.mjs
```

The generator creates `deliverables/jays-greenhouse-training.pptx`. Edit the Markdown or the book, then run the command again; the PowerPoint is generated output rather than another source to maintain.

Zensical 0.0.23 currently warns that strict mode is unsupported. The command is retained so the repository adopts strict behavior when the renderer supports it. `scripts/validate_docs.py` is the enforceable, renderer-independent quality gate today.

## Make It Match Another Brand

Change the color, typography, radius, and spacing tokens at the top of `docs/assets/stylesheets/brand-2026.css`. Replace `docs/assets/images/mark.svg`. Then update the site name and copyright notice in `zensical.toml`. The Markdown does not need to change. See the [branding guide](docs/about/branding.md).

## Content Model

- **Product documentation** proves that the workflow supports real technical content.
- **Repository documentation** reveals how the example is assembled and governed.
- **Contributor guidance** makes quality expectations explicit and repeatable.
- **Generated deliverables** show that one reviewed source can support more than one channel.

## Scope and Disclosure

All names, specifications, incidents, commands, and workflows in the product documentation are invented for this demo. The repository contains no Peraton-specific, customer, proprietary, export-controlled, or classified information. “ThreatBoard-style” describes the general docs-as-code pattern requested for this portfolio sample, not copied content or branding.

## Author

Katie Kearns — technical writer and documentation systems practitioner.

## License

Code and documentation are available under the [MIT License](LICENSE).
