# Automated Accessibility and Regression Tests

The rendered documentation is tested in Chromium with Playwright.

## What the Tests Cover

- **Accessibility:** axe-core scans every maintained page against WCAG 2 A/AA and WCAG 2.1 A/AA rules. Serious and critical violations fail the test.
- **Responsive regression:** the home page is checked for horizontal overflow at 320, 360, 390, 768, 1024, and 1440 CSS pixels. Failures report the exact overflowing elements.

Automated checks supplement the manual keyboard, zoom, screen-reader, reduced-motion, visual, and generated-document review in the release checklist.

## Run Locally

Install Python and Node dependencies, then install Chromium once:

```bash
python -m pip install -r requirements.txt
npm install
npx playwright install chromium
npm test
```

Run a single group with `npm run test:a11y` or `npm run test:responsive`.

## Read Failures

Accessibility failures list the affected axe rule and rendered elements. Responsive failures list each element extending beyond the viewport. CI retains the Playwright HTML report when a test fails.

## Limitations

axe-core cannot prove full accessibility, and overflow checks are not visual snapshot comparisons. Manual review remains required for keyboard behavior, visible focus, 200% zoom, assistive-technology semantics, contrast judgment, motion preferences, unintended visual changes, and Word/PDF rendering.
