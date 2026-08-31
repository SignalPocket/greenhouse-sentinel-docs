# Greenhouse Sentinel

**A fictional product with real documentation engineering behind it.**

Greenhouse Sentinel is a small controller that watches three environmental signals and recommends a response before plants are stressed. This site documents the fictional controller and, just as importantly, the docs-as-code system that publishes this site.

<div class="hero-actions" markdown>
[Start the product tour](product/quickstart.md){ .md-button .md-button--primary }
[See how the repo works](about/how-it-works.md){ .md-button }
</div>

## One source, several useful outputs

Authors write accessible Markdown. Automated checks verify navigation, internal links, anchors, and basic authoring rules. Zensical turns the reviewed source into this searchable site, and the export job creates Word and PDF versions for readers who need portable files.

## The fictional product in 30 seconds

Greenhouse Sentinel samples temperature, humidity, and soil moisture every 60 seconds. A rule engine assigns the greenhouse a state: **normal**, **watch**, or **act**. The operator dashboard explains the reading and links each alert to a documented response.

!!! note "Portfolio disclosure"
    Greenhouse Sentinel does not exist. Its behavior, data, and interface are intentionally simple and invented. The repository exists to demonstrate documentation architecture, authoring, validation, CI, publishing, and multi-format delivery without confidential information.

## Explore both layers

- Use the [quick start](product/quickstart.md) and [operating guide](product/operations.md) as if you were evaluating product documentation.
- Read [How this repository works](about/how-it-works.md) to inspect the mechanics behind the site.
- Review the [accessibility standard](contributing/accessibility.md) and [release checklist](contributing/release-checklist.md) to see how quality becomes part of the workflow.

