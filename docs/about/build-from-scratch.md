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

Create `docs/assets/stylesheets/brand-2026.css` with purpose-based tokens for primary, accent, surface, text, focus, and radius values. Add a compact accessible SVG mark. Use the tokens for visible focus, mobile button stacking, readable line lengths, and reduced-motion behavior. Do not place brand decisions in Markdown.

## 9. Generate Word from reviewed source

Create `scripts/export_handbook.py`. Read the same navigation list as the site and process pages in that order. Map Markdown headings to real Word heading styles, sequences and bullets to list styles, code to a monospaced style, and Markdown tables to Word tables. Apply explicit page geometry, typography, spacing, colors, footer text, and public document properties.

## 10. Generate PDF

In CI, convert the Word handbook with headless LibreOffice. Check that Word and PDF files exist and are non-empty. Render every page to images for visual review. Inspect the pages for clipping, overlap, broken tables, awkward breaks, missing glyphs, and misplaced page furniture.

## 11. Automate the workflow

Create `.github/workflows/docs.yml` for pushes, pull requests, and manual runs. The workflow automates the mechanical publishing sequence:

1. Check out the exact Git commit under review.
2. Install the dependency versions pinned by the repository.
3. Run `scripts/validate_docs.py` against the Markdown and navigation configuration.
4. Build the complete Zensical site from the reviewed source.
5. Run `scripts/export_handbook.py` to assemble the Markdown pages in explicit navigation order.
6. Create the Word handbook with real heading, list, table, and document styles.
7. Convert the Word handbook to PDF with headless LibreOffice.
8. Confirm that the site, Word file, and PDF exist and are non-empty.
9. Upload the site and portable files as reviewable build artifacts.
10. On the `main` branch, upload the site to GitHub Pages and deploy the live URL.

The workflow does not decide whether an explanation is correct or whether a procedure is useful. Those decisions remain with the author and reviewers. Automation answers repeatable questions such as whether a target exists, whether the build succeeds, and whether all expected outputs were produced.

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

The normal authoring cycle is smaller than the initial repository setup.

### Author the change

1. Start with a reader problem or a verified product change.
2. Edit the relevant Markdown under `docs/`. Do not edit `site/`, Word, or PDF because those files are generated outputs.
3. Add a new page to `zensical.toml` when the change introduces a new topic.
4. Add or update relative links and stable anchors when other pages depend on the content.
5. Keep branding changes in the stylesheet, logo asset, or publishing configuration.

### Check the change locally

1. Run `python scripts/validate_docs.py`.
2. Build or serve the Zensical site.
3. Read the rendered page in context, not only the source diff.
4. Regenerate Word and PDF when the change affects portable output.
5. Complete editorial, accessibility, responsive, and generated-file review in proportion to the risk of the change.

### Review and publish

1. Commit only the intended source and configuration changes.
2. Open a focused pull request that explains the reader need and the checks performed.
3. Let CI repeat validation and generate review artifacts from a clean environment.
4. Have the appropriate people review technical meaning, writing quality, accessibility, and presentation.
5. Merge only after the automated gates and human review pass.
6. Let the `main`-branch workflow rebuild every output and deploy GitHub Pages.

This creates a simple ownership boundary. People author and approve meaning. The repository automates validation, transformation, packaging, and deployment.
