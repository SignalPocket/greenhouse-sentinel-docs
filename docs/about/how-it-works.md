# How This Repository Works

This page is the guided tour of the artifact you are reading. Every feature points to a real, inspectable implementation in the repository.

For the complete construction sequence, continue with [Build It from Scratch](build-from-scratch.md).

## Author Once in Markdown

All maintained content lives under `docs/`. Product guides and repository guidance use the same lightweight syntax, review process, and validation rules. Each page has one level-one heading. Sections follow a logical hierarchy. Relative links keep the content portable between source review and rendered output.

## Follow One Authoring Process

An author works with the Markdown source rather than editing the generated site, Word file, or PDF.

1. **Start with a reader need.** Identify the task, question, or decision the page must support.
2. **Find the maintained source.** Edit the existing Markdown page or create a focused new page under `docs/`.
3. **Write and connect the content.** Use headings, descriptive relative links, stable anchors when needed, accessible tables, and verified examples.
4. **Run the local checks.** The validator checks navigation, files, anchors, headings, image text, and link wording. Zensical builds a local preview from the same source.
5. **Review the rendered result.** The author checks the page as a reader would, including navigation, responsive layout, keyboard behavior, and any generated Word or PDF pages affected by the change.
6. **Open a pull request.** Reviewers see the exact source diff, the automated results, and the generated artifacts. They do not edit a separate Word copy.
7. **Merge the approved change.** GitHub Actions repeats the checks, rebuilds every output, and publishes the live site from the accepted source.

The Markdown commit is the maintained record. The website, Word handbook, and PDF are outputs of that record.

## Divide Human and Automated Work

| Human judgment | Automated work |
| --- | --- |
| Decide what readers need and what belongs in scope | Confirm every configured navigation file exists |
| Verify technical meaning and release accuracy | Detect missing pages, files, links, and anchors |
| Write procedures, explanations, warnings, and troubleshooting guidance | Enforce basic heading, image-text, and link-label rules |
| Decide whether a table, note, example, or cross-reference helps | Build the Zensical HTML site from Markdown |
| Review accessibility, usability, and visual quality | Generate the Word handbook and convert it to PDF |
| Approve the change | Check that expected artifacts exist and deploy the site |

Automation handles repeatable questions with objective answers. Authors and reviewers remain responsible for accuracy, usefulness, safety, and clarity.

## Control the Information Architecture

`zensical.toml` contains an explicit `nav` list. This makes the intended order and grouping reviewable instead of relying on a renderer to infer structure from filenames. The validation script also fails when a Markdown page is missing from navigation.

## Keep Cross-References Stable

High-value targets use deliberate HTML anchors such as `decision-states` in the [architecture guide](../product/architecture.md#decision-states). `scripts/validate_docs.py` resolves every internal Markdown link and fragment before publication. Changing a heading can no longer silently strand an important link.

The product pages include labeled **Feature in action** notes beside representative examples. These notes expose the implementation without interrupting the primary task for readers who only need the fictional product instructions.

## See Each Authoring Feature Work

Each example below identifies what readers can inspect, how the feature is produced, and why the implementation is useful.

- **Cross-Reference.** **Made with:** the operating guide links to `architecture.md#decision-states`, where a deliberate anchor marks the target. The validator resolves both the file and fragment. **Why it helps:** the link remains dependable when nearby headings are edited, and a failed target stops the release instead of surprising a reader.
- **Descriptive Link.** **Made with:** the quick start names the troubleshooting symptom in the link text, and the validator rejects common context-free labels. **Why it helps:** readers, screen-reader users, and reviewers know the destination without having to reconstruct the surrounding sentence.
- **Semantic Table.** **Made with:** the architecture page uses Markdown table syntax for repeated state, condition, and expectation fields. Zensical creates accessible HTML, and the export script creates a real Word table with a repeating header row. **Why it helps:** the relationship stays clear in the browser, Word, and PDF without maintaining format-specific tables.
- **Admonition.** **Made with:** a labeled `!!! info` block in Markdown and theme styling in the publishing layer. **Why it helps:** important context stands out visually while retaining a readable text label and simple source that reviewers can understand.
- **Code Block.** **Made with:** fenced Markdown blocks, copy support in the site theme, and an explicit monospaced export style. **Why it helps:** commands and sample output preserve spacing across formats and are easier to copy without transcription errors.
- **Explicit Navigation.** **Made with:** the ordered `nav` list in `zensical.toml` and validation that detects missing targets and maintained pages left out of navigation. **Why it helps:** information architecture is intentional, reviewable, and traceable instead of depending on filenames or renderer guesses.
- **Brand Tokens.** **Made with:** purpose-based CSS variables and a separate logo asset outside the Markdown source. **Why it helps:** a team can rebrand the site quickly and consistently without risking changes to the technical meaning or portable documents.
- **Automated Validation.** **Made with:** a renderer-independent Python script that inspects navigation, headings, images, local files, links, and anchors before the build. **Why it helps:** repeatable checks finish quickly, free reviewers for judgment-heavy work, and leave an objective pass-or-fail record with each change.
- **Continuous Integration.** **Made with:** `.github/workflows/docs.yml`, which runs the same validation and publishing sequence for pull requests and accepted changes. **Why it helps:** the workflow catches environment-specific failures, proves which version was tested, and creates a traceable release history.
- **Multi-Format Publishing.** **Made with:** one navigation order, Zensical for the site, `scripts/export_handbook.py` for Word, and headless LibreOffice for PDF. **Why it helps:** the website, Word handbook, and PDF stay synchronized while authors maintain only one source.

## Separate Content from Presentation

`docs/assets/stylesheets/brand-2026.css` defines brand tokens and a small set of presentation rules. `docs/assets/images/mark.svg` contains the fictional mark. A new organization can replace the visual layer without editing product meaning. Try the [branding exercise](branding.md#five-minute-rebrand).

## Validate Before Rendering

`scripts/validate_docs.py` checks:

- every configured navigation target exists
- every maintained Markdown page appears in navigation
- internal files and anchors resolve
- each page has exactly one level-one heading
- images have useful alternative text
- common inaccessible link labels are rejected.

`zensical build --strict` requests the renderer's strict behavior. Zensical 0.0.23 currently reports that strict mode is unsupported, so the custom validator is the enforceable gate today. It is deliberately independent of the renderer so core quality checks remain if the publishing engine changes.

## Build and Review Automatically

`.github/workflows/docs.yml` runs validation, builds the Zensical site in strict mode, generates Word output, converts it to PDF, performs basic artifact checks, and uploads the results for review. Pull requests get the same gates as the default branch.

## Publish Several Channels

Zensical creates the searchable HTML experience. `scripts/export_handbook.py` assembles the same maintained Markdown into a styled Word handbook with a **Page X of Y** footer. CI converts that Word file to PDF and preserves the footer numbers. These are publishing transformations, not separate authoring silos.

## Treat Accessibility as an Authoring Constraint

The [accessibility standard](../contributing/accessibility.md) covers heading order, descriptive links, alternative text, tables, keyboard focus, zoom, contrast, and reduced motion. CSS enhances focus visibility and avoids essential animation.

## Release with Evidence

The [release checklist](../contributing/release-checklist.md) joins automated checks with human review: wording, task completeness, responsive behavior, keyboard use, zoom, and generated-file inspection.
