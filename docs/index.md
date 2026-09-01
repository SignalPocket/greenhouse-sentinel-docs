# Greenhouse Sentinel Documentation Demo

**A fictional product with real documentation engineering behind it.**

This is a public, self-documenting portfolio sample by [Katie Kearns](https://github.com/SignalPocket). Greenhouse Sentinel is a small fictional controller that watches three environmental signals and recommends a response before plants are stressed. Its limited scope makes the product documentation quick to understand while leaving enough structure to demonstrate a production-minded docs-as-code workflow.

<div class="hero-actions" markdown>
[Start the Product Tour](product/quickstart.md){ .md-button .md-button--primary }
[See How the Repo Works](about/how-it-works.md){ .md-button }
[Read the Structured Ink Case Study](https://structured-ink.com/portfolio/greenhouse-sentinel-docs-as-code/){ .md-button }
</div>

## Why This Demo Exists

This site is both a technical-writing sample and a reusable reference implementation. It shows how a documentation team can keep content reviewable in Git, publish a searchable site, customize presentation without rewriting source, detect broken navigation and cross-references, and generate portable Word and PDF deliverables.

Everything needed to evaluate the sample is documented on this site. The [Structured Ink case study](https://structured-ink.com/portfolio/greenhouse-sentinel-docs-as-code/) explains the problem, constraints, design decisions, demonstrated finding, and transferable lessons. This live site supplies the working proof. The public [GitHub repository](https://github.com/SignalPocket/greenhouse-sentinel-docs) provides the source and commit history for reviewers who want to inspect the implementation.

## One Source, Several Useful Outputs

Authors maintain one set of accessible Markdown files. Automated checks verify navigation, internal links, anchors, authoring rules, rendered-page accessibility, and responsive overflow. The publishing workflow then generates three outputs from that same reviewed source:

1. this searchable Zensical site
2. a Microsoft Word handbook
3. a PDF handbook

The Word and PDF files are not separately maintained copies. When an approved Markdown change is merged, automation rebuilds all three outputs together.

<div class="hero-actions" markdown>
[Download the Word handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.docx){ .md-button }
[Download the PDF handbook](https://signalpocket.github.io/greenhouse-sentinel-docs/downloads/greenhouse-sentinel-handbook.pdf){ .md-button }
</div>

## What This Repository Demonstrates

Each feature is implemented in the public repository, not merely described in the portfolio narrative.

| Feature | Made With | Why It Helps |
| --- | --- | --- |
| Single-Source Authoring | One reviewed set of Markdown files under `docs/` | Authors change content once instead of reconciling separate website, Word, and PDF copies |
| Explicit Navigation | An ordered `nav` list in `zensical.toml` plus a check for unlisted pages | Readers get a deliberate sequence, and reviewers can trace every published page to its configuration |
| Stable Cross-References | Deliberate anchors on important targets, as shown by [Decision States](product/architecture.md#decision-states), plus automated fragment checks | Heading edits cannot silently strand important links |
| Automated Validation | `scripts/validate_docs.py`, which checks navigation, files, links, anchors, heading structure, and image text | Routine defects are found in seconds and resolved before publication |
| Continuous Integration and Publishing | A GitHub Actions workflow that repeats validation and generation from a clean copy of each proposed change | Every release follows the same recorded process, improving consistency, accuracy, and traceability |
| Accessible Authoring | Source standards, validation rules, accessible theme overrides, and a release checklist | Accessibility is addressed while content is written and reviewed instead of as a late repair |
| Browser Accessibility and Responsive QA | Playwright, axe-core, 14 rendered-page scans, and 12 viewport scenarios | Covered serious or critical accessibility defects and horizontal overflow block publication with auditable evidence |
| Replaceable Branding | CSS variables, a separate logo asset, and publishing configuration outside the Markdown | An organization can change the visual identity without rewriting or forking technical content |
| Multi-Format Delivery | Zensical for HTML, a Python export script for Word, and headless LibreOffice for PDF | Teams serve web and portable-document readers without maintaining three competing sources |
| Self-Documentation | Implementation notes, a complete build chapter, contributor guidance, and links to the actual configuration and scripts | Another writer can inspect, explain, reproduce, or adapt the workflow without undocumented setup knowledge |

See [How This Repository Works](about/how-it-works.md) for a closer look at the implementation and benefit of each feature.

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
- **Repository documentation** reveals how the example is assembled and governed. Read [How This Repository Works](about/how-it-works.md) and [Build It from Scratch](about/build-from-scratch.md).
- **Contributor guidance** makes quality expectations explicit and repeatable. Review the [writing guide](contributing/writing-guide.md), [accessibility standard](contributing/accessibility.md), [test evidence](contributing/test-results.md), and [release checklist](contributing/release-checklist.md).
- **Generated deliverables** prove that one reviewed source can support several channels. Use the Word and PDF download buttons above to inspect the portable versions.

## Public Portfolio Scope

All product names, specifications, incidents, commands, and workflows in this demonstration are invented. The repository contains no Peraton-specific, customer, proprietary, export-controlled, or classified information. “ThreatBoard-style” describes the general docs-as-code pattern demonstrated by this sample, not copied content or branding.

Katie Kearns created this sample as a technical-writing and documentation-systems portfolio project. The code and documentation are available under the [MIT License](https://github.com/SignalPocket/greenhouse-sentinel-docs/blob/main/LICENSE).
