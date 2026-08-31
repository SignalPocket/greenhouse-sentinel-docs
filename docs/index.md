# Greenhouse Sentinel Documentation Demo

**A fictional product with real documentation engineering behind it.**

This is a public, self-documenting portfolio sample by [Katie Kearns](https://github.com/SignalPocket). Greenhouse Sentinel is a small fictional controller that watches three environmental signals and recommends a response before plants are stressed. Its limited scope makes the product documentation quick to understand while leaving enough structure to demonstrate a production-minded docs-as-code workflow.

<div class="hero-actions" markdown>
[Start the product tour](product/quickstart.md){ .md-button .md-button--primary }
[See how the repo works](about/how-it-works.md){ .md-button }
</div>

## Why This Demo Exists

This site is both a technical-writing sample and a reusable reference implementation. It shows how a documentation team can keep content reviewable in Git, publish a searchable site, customize presentation without rewriting source, detect broken navigation and cross-references, and generate portable Word and PDF deliverables.

Everything needed to evaluate the sample is documented on this site. The public [GitHub repository](https://github.com/SignalPocket/greenhouse-sentinel-docs) provides the source and commit history for reviewers who want to inspect the implementation.

## One Source, Several Useful Outputs

Authors maintain one set of accessible Markdown files. Automated checks verify navigation, internal links, anchors, and basic authoring rules. The publishing workflow then generates three outputs from that same reviewed source:

1. this searchable Zensical site
2. a Microsoft Word handbook
3. a PDF handbook

The Word and PDF files are not separately maintained copies. When an approved Markdown change is merged, automation rebuilds all three outputs together.

<div class="hero-actions" markdown>
[Download the Word handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.docx){ .md-button }
[Download the PDF handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.pdf){ .md-button }
</div>

## What This Repository Demonstrates

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

## Architecture at a Glance

```text
One reviewed Markdown source
          |
          +--> validation --> pull-request and release gates
          |
          +--> Zensical --> searchable HTML site
          |
          +--> export script --> Word handbook --> PDF handbook

Brand tokens change presentation without changing source meaning.
```

The renderer can change while the release requirements remain stable. Explicit navigation, valid links and anchors, accessible structure, reproducible builds, and reviewable changes remain required.

## The Fictional Product in 30 Seconds

Greenhouse Sentinel samples temperature, humidity, and soil moisture every 60 seconds. A rule engine assigns the greenhouse a state: **normal**, **watch**, or **act**. The operator dashboard explains the reading and links each alert to a documented response.

!!! note "Portfolio disclosure"
    Greenhouse Sentinel does not exist. Its behavior, data, and interface are intentionally simple and invented. The repository exists to demonstrate documentation architecture, authoring, validation, CI, publishing, and multi-format delivery without confidential information.

## What Is Included

- **Product documentation** proves the workflow can support task-based technical content. Start with the [quick start](product/quickstart.md), [operating guide](product/operations.md), and [architecture](product/architecture.md).
- **Repository documentation** reveals how the example is assembled and governed. Read [How this repository works](about/how-it-works.md) and [Build it from scratch](about/build-from-scratch.md).
- **Contributor guidance** makes quality expectations explicit and repeatable. Review the [writing guide](contributing/writing-guide.md), [accessibility standard](contributing/accessibility.md), and [release checklist](contributing/release-checklist.md).
- **Generated deliverables** prove that one reviewed source can support several channels. Use the Word and PDF download buttons above to inspect the portable versions.

## Public Portfolio Scope

All product names, specifications, incidents, commands, and workflows in this demonstration are invented. The repository contains no Peraton-specific, customer, proprietary, export-controlled, or classified information. “ThreatBoard-style” describes the general docs-as-code pattern demonstrated by this sample, not copied content or branding.

Katie Kearns created this sample as a technical-writing and documentation-systems portfolio project. The code and documentation are available under the [MIT License](https://github.com/SignalPocket/greenhouse-sentinel-docs/blob/main/LICENSE).
