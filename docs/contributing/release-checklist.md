# Release Checklist

## Automated Gates

- [ ] The independent documentation validator passes.
- [ ] `zensical build --strict` succeeds.
- [ ] Every maintained page is present in explicit navigation.
- [ ] Internal files and anchors resolve.
- [ ] Browser tests report no serious or critical axe violations.
- [ ] Responsive tests report no horizontal overflow at every required width.
- [ ] Word and PDF outputs are generated and pass artifact checks.

## Editorial Review

- [ ] The change answers a reader goal and states expected results.
- [ ] Terms, labels, units, and cross-references are consistent.
- [ ] No confidential, customer, proprietary, export-controlled, or classified information is present.
- [ ] Fictional values and limitations are identified.

## Accessibility and Responsive Review

- [ ] Heading order and landmark structure are logical.
- [ ] Keyboard focus is visible and the skip link works.
- [ ] Text remains usable at 200% zoom.
- [ ] Pages have no horizontal overflow at 320, 360, 390, 768, 1024, and 1440 CSS pixels.
- [ ] Long labels, buttons, navigation, email addresses, and graphics wrap or crop safely.
- [ ] Motion is reduced when the operating-system preference requests it.

## Generated-File Review

- [ ] Every Word and PDF page has been visually inspected.
- [ ] Headings, lists, tables, links, headers, and footers render correctly.
- [ ] File names, document properties, and visible content are suitable for public release.
