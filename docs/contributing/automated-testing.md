# Automated Accessibility and Regression Tests

The rendered documentation is tested in Chromium with Playwright.

## What the Tests Cover

- **Accessibility:** axe-core scans every maintained page against WCAG 2 A/AA and WCAG 2.1 A/AA rules. Serious and critical violations fail the test.
- **Responsive regression:** the home page is checked for horizontal overflow at 320, 360, 390, 768, 1024, and 1440 CSS pixels. Failures report the exact overflowing elements.
- **Visual regression:** full-page screenshots of the home page at 320 and 1440 CSS pixels are compared with committed baselines.

Automated checks supplement the manual keyboard, zoom, screen-reader, reduced-motion, and generated-document review in the release checklist.

## Run Locally

Install Python and Node dependencies, then install Chromium once:

```bash
python -m pip install -r requirements.txt
npm ci
npx playwright install chromium
npm test
```

Run a single group with `npm run test:a11y`, `npm run test:responsive`, or `npm run test:visual`.

## Review an Intended Visual Change

Inspect the Playwright report and confirm the change is intended before running:

```bash
npm run test:visual:update
```

Review the changed PNG files, rerun `npm test`, and commit approved baselines with the CSS or template change.

## Limitations

axe-core cannot prove full accessibility, and screenshots cannot evaluate usability. Manual review remains required for keyboard behavior, visible focus, 200% zoom, assistive-technology semantics, motion preferences, and Word/PDF rendering.
