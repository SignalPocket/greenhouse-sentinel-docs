# Greenhouse Sentinel

**A fictional product with real documentation engineering behind it.**

Greenhouse Sentinel is a small controller that watches three environmental signals and recommends a response before plants are stressed. This site documents the fictional controller and, just as importantly, the docs-as-code system that publishes this site.

<div class="hero-actions" markdown>
[Start the product tour](product/quickstart.md){ .md-button .md-button--primary }
[See how the repo works](about/how-it-works.md){ .md-button }
</div>

## One source, several useful outputs

Authors maintain one set of accessible Markdown files. Automated checks verify navigation, internal links, anchors, and basic authoring rules. The publishing workflow then generates three outputs from that same reviewed source:

1. this searchable Zensical site
2. a Microsoft Word handbook
3. a PDF handbook

The Word and PDF files are not separately maintained copies. When an approved Markdown change is merged, automation rebuilds all three outputs together.

<div class="hero-actions" markdown>
[Download the Word handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.docx){ .md-button }
[Download the PDF handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.pdf){ .md-button }
</div>

## What this repository demonstrates

- **Single-source authoring:** maintain content once in Markdown and generate the website, Word handbook, and PDF handbook together.
- **Explicit navigation:** control page order and grouping in `zensical.toml` instead of relying on filenames.
- **Stable cross-references:** use deliberate anchors for important targets, as shown by [Decision states](product/architecture.md#decision-states).
- **Automated validation:** detect missing navigation entries, files, internal links, anchors, headings, and image text before publication.
- **Continuous integration and publishing:** run the same checks and builds for pull requests, then deploy approved changes through GitHub Actions.
- **Accessible authoring:** apply standards for headings, descriptive links, alternative text, tables, keyboard focus, readable sizing, zoom, and reduced motion.
- **Replaceable branding:** change logos, colors, typography, and presentation rules without rewriting the Markdown source.
- **Multi-format delivery:** publish searchable HTML plus downloadable Word and PDF files for different reading needs.
- **Self-documentation:** explain the architecture, authoring process, automation, construction steps, and release checks inside the artifact itself.

See [How this repository works](about/how-it-works.md) for an inspectable example of each feature.

## The fictional product in 30 seconds

Greenhouse Sentinel samples temperature, humidity, and soil moisture every 60 seconds. A rule engine assigns the greenhouse a state: **normal**, **watch**, or **act**. The operator dashboard explains the reading and links each alert to a documented response.

!!! note "Portfolio disclosure"
    Greenhouse Sentinel does not exist. Its behavior, data, and interface are intentionally simple and invented. The repository exists to demonstrate documentation architecture, authoring, validation, CI, publishing, and multi-format delivery without confidential information.

## Explore both layers

- Use the [quick start](product/quickstart.md) and [operating guide](product/operations.md) as if you were evaluating product documentation.
- Read [How this repository works](about/how-it-works.md) to inspect the mechanics behind the site.
- Review the [accessibility standard](contributing/accessibility.md) and [release checklist](contributing/release-checklist.md) to see how quality becomes part of the workflow.
