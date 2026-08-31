# Build it from scratch

This chapter records every step used to construct this repository. Follow it to reproduce the demo or adapt the workflow for another small documentation set.

## 1. Define the public boundary

Choose a fictional product with enough behavior for procedures, concepts, reference material, troubleshooting, and cross-references. Record the release rule before drafting: no employer, customer, proprietary, export-controlled, or classified information. Greenhouse Sentinel is intentionally fictional and recommends—but never performs—physical actions.

## 2. Create an independent repository

Use a dedicated repository so its dependencies and automation run only when this project changes.

```text
.
├── .github/workflows/docs.yml
├── deliverables/
├── docs/
│   ├── about/
│   ├── assets/
│   ├── contributing/
│   └── product/
├── scripts/
├── README.md
├── requirements.txt
└── zensical.toml
```

Ignore `site/`, virtual environments, caches, and local QA files. Keep portfolio-ready files in `deliverables/`.

## 3. Design the information architecture

Create three reader journeys: **Product guide** for realistic technical content, **How this repository works** for implementation details, and **Contribute** for authoring and quality standards. Write their order and labels explicitly in the `nav` array in `zensical.toml`.

## 4. Configure the renderer

Pin Zensical in `requirements.txt`. Set the site identity, public and repository URLs, navigation, theme features, light and dark palettes, Markdown extensions, and custom stylesheet in `zensical.toml`. Use links to Markdown files so source previews and renderers can both resolve them.

## 5. Write a thin but complete product set

Create the product pages in reader order:

1. `quickstart.md` establishes the first successful outcome.
2. `operations.md` documents a repeatable task.
3. `architecture.md` explains boundaries, components, rules, and retention.
4. `troubleshooting.md` begins with observable symptoms and preserves escalation evidence.

Use one level-one heading per page, sequential subheadings, direct instructions, expected results, and honest fictional-product limitations.

## 6. Add stable cross-references

Add deliberate lowercase anchors before high-value targets:

```html
<a id="decision-states"></a>
## Decision states
```

Link with a relative source path and stable fragment:

```markdown
[Decision states](architecture.md#decision-states)
```

This decouples important links from incidental heading punctuation.

Explain the feature where readers encounter it. This demo uses a labeled `!!! info` note after the representative cross-reference. The note identifies the source syntax, published behavior, accessibility benefit, and validation rule. Apply the same pattern selectively to tables, code blocks, admonitions, navigation, branding, and exports so the repository demonstrates rather than merely claims each capability.

## 7. Build independent validation

Create `scripts/validate_docs.py` with Python standard-library dependencies. Read `zensical.toml`, flatten navigation, discover maintained Markdown, extract headings and anchors, and resolve every local link relative to its source.

Fail when navigation names a missing file, a maintained page is omitted, a file or anchor does not resolve, a page lacks exactly one level-one heading, heading levels skip, an informative image has no alternative text, or a link uses context-free wording such as “click here.” Keep this separate from Zensical so renderer changes do not weaken the release gate.

## 8. Add replaceable branding

Create `docs/assets/stylesheets/brand.css` with purpose-based tokens for primary, accent, surface, text, focus, and radius values. Add a compact accessible SVG mark. Use the tokens for visible focus, mobile button stacking, readable line lengths, and reduced-motion behavior. Do not place brand decisions in Markdown.

## 9. Generate Word from reviewed source

Create `scripts/export_handbook.py`. Read the same navigation list as the site and process pages in that order. Map Markdown headings to real Word heading styles, sequences and bullets to list styles, code to a monospaced style, and Markdown tables to Word tables. Apply explicit page geometry, typography, spacing, colors, footer text, and public document properties.

## 10. Generate PDF

In CI, convert the Word handbook with headless LibreOffice. Check that Word and PDF files exist and are non-empty. Render every page to images for visual review; inspect for clipping, overlap, broken tables, awkward breaks, missing glyphs, headers, and footers.

## 11. Automate the workflow

Create `.github/workflows/docs.yml` for pushes, pull requests, and manual runs. The job checks out the repo, installs pinned dependencies, runs independent validation, requests a strict Zensical build, generates Word and PDF, checks artifacts, and uploads the site plus portable files for review.

Zensical 0.0.23 currently warns that strict mode is unsupported. Retain the flag for forward compatibility, but make the independent validator the enforceable gate.

## 12. Test the site

Build and serve `site/`. Test at 320, 360, 390, 768, 1024, and 1440 CSS pixels. At every width, verify `scrollWidth <= clientWidth`. Test the skip link, navigation, search, theme control, links, buttons, visible focus, heading order, descriptive links, 200% zoom, long-label wrapping, touch targets, light and dark contrast, and reduced motion.

## 13. Review for public release

Complete the release checklist. Inspect source history, rendered pages, generated files, document properties, repository description, and README for sensitive or employer-specific material. Confirm every limitation is stated plainly.

## 14. Publish the GitHub repository

Initialize Git in this folder, set `main` as the default branch, commit the verified files, create a public repository named `greenhouse-sentinel-docs`, and push only this folder. Require the documentation workflow before merge when account settings allow it. Optionally deploy `site/` with GitHub Pages.

## 15. Link from the portfolio

After publication, add a small portfolio entry that links to this repository and optionally its live site. Describe the reader problem and demonstrated capabilities. Do not embed this repository's build into the portfolio build.

## 16. Update and release

For every change: edit the isolated source or presentation layer, add new pages to navigation, validate, build, regenerate portable outputs, complete proportional editorial/accessibility/responsive QA, open a focused pull request, and merge only after CI and review pass.
