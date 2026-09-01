# Test Evidence and Latest Results

This page makes the quality proposal auditable. It identifies exactly what the Greenhouse Sentinel demonstration tests, what causes a failure, and what a successful run proves. The live panel links every claim to the latest completed `main` workflow run.

<div id="test-results" class="test-results" aria-live="polite" aria-busy="true">
  <p>Loading the latest test results…</p>
</div>

<noscript>
  JavaScript is required to display the live run summary. View the
  <a href="https://github.com/SignalPocket/greenhouse-sentinel-docs/actions/workflows/docs.yml">Docs checks workflow on GitHub</a>.
</noscript>

## Passing-Run Summary

When the **browser-tests** job passes, the current suite has completed all of these checks:

| Evidence | Exact coverage | Failure threshold |
| --- | --- | --- |
| Accessibility scans | 14 rendered documentation pages in Chromium | Any axe violation rated **serious** or **critical** |
| WCAG rule families | WCAG 2.0 A/AA and WCAG 2.1 A/AA rules available in axe-core | A covered rule fails at the configured impact threshold |
| Responsive regression | Home page and this evidence page at 320, 360, 390, 768, 1024, and 1440 CSS pixels: **12 scenarios** | Any element extends beyond the document viewport |
| Production rendering | The Zensical production build served through a local HTTP server | A page cannot build, load, or complete its test |
| Evidence retention | Playwright HTML report uploaded for every CI run | Report-generation or test execution failure |

A successful **validate-build-export** job additionally proves that the source validator, production build, Word export, PDF conversion, and generated-artifact checks all completed.

## Accessibility Coverage

Every maintained page receives its own axe scan:

1. Overview
2. Quick Start
3. Operating Guide
4. Architecture
5. Troubleshooting
6. Workflow Tour
7. Build It from Scratch
8. Branding
9. Publishing
10. Writing Guide
11. Accessibility
12. Automated Testing
13. Release Checklist
14. Test Evidence and Latest Results

The scan includes axe rules tagged `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa`. The test fails on serious or critical findings, including covered problems such as insufficient color contrast, missing accessible names, invalid ARIA relationships, and structural barriers detectable by axe.

The suite has already demonstrated its value: its first run detected active-navigation text with a **2.9:1** contrast ratio where **4.5:1** was required. The color was corrected, and the subsequent scan passed across the full page set.

!!! important "What this does not claim"
    An automated axe pass is not a declaration of complete WCAG conformance. Automation cannot fully judge writing clarity, keyboard usability, focus order, screen-reader experience, meaningful alternative text, cognitive load, or whether an interaction is understandable.

## Responsive Coverage

The automated layout test sets the browser to each required width:

- 320, 360, and 390 pixels for narrow phones
- 768 pixels for tablets
- 1024 pixels for compact desktop and landscape layouts
- 1440 pixels for full desktop layouts

At each width, the test compares `document.documentElement.scrollWidth` with `clientWidth`. When overflow exists, the failure identifies every element whose bounding box extends beyond the left or right viewport edge, including its tag, ID, classes, and measured coordinates.

The home page and this evidence page are checked at all six widths. The evidence page is intentionally included because its tables, status labels, long workflow data, and job names represent likely overflow risks.

## Documentation Integrity Checks

The renderer-independent validator fails the workflow when it finds:

- A navigation target that does not exist
- A maintained Markdown page omitted from navigation
- Anything other than exactly one H1 on a page
- A skipped heading level
- An image with empty alternative text
- Non-descriptive link text such as “click here,” “here,” “read more,” or “more”
- A missing internal file target
- A missing Markdown anchor

The strict production build runs separately, so both source rules and rendered-site construction are release gates.

## Portable-Document and Deployment Checks

The workflow also verifies that:

- Word and PDF handbooks are generated and nonempty
- The production HTML entry point exists
- Downloadable Word and PDF files are included in the published site
- The branded stylesheet is linked from generated HTML
- The Word footer contains both current-page and total-page fields
- The site and portable deliverables are retained as workflow artifacts
- GitHub Pages deploys only after both the build/export job and browser-test job succeed

## Manual Evidence Still Required

The release checklist retains human review for:

- Complete keyboard operation and logical focus order
- Visible focus and skip-link behavior
- Usability at 200% browser zoom
- Screen-reader announcements and reading sequence
- Meaning and quality of alternative text
- Motion preferences and interaction comprehension
- Visual comparison beyond horizontal overflow
- Word and PDF page breaks, clipping, glyphs, tables, and reading order

This separation is deliberate: automation provides repeatable release gates, while expert review covers judgments that automated tools cannot make.

## Inspect the Implementation

- [Browser test source](https://github.com/SignalPocket/greenhouse-sentinel-docs/blob/main/tests/site.spec.ts)
- [Documentation validator](https://github.com/SignalPocket/greenhouse-sentinel-docs/blob/main/scripts/validate_docs.py)
- [GitHub Actions workflow](https://github.com/SignalPocket/greenhouse-sentinel-docs/blob/main/.github/workflows/docs.yml)
- [Release checklist](release-checklist.md)
- [Local testing instructions](automated-testing.md)
