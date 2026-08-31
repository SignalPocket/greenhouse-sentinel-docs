# Accessibility

Accessibility is part of authoring and release, not a cleanup pass after publication.

## Authoring standard

- Use a logical heading hierarchy and one clear page title.
- Write descriptive link text that makes sense in a list of links.
- Add concise alternative text to informative images; hide decorative imagery from assistive technology in templates.
- Give tables a header row and use tables only for genuinely tabular relationships.
- Do not use color as the only way to communicate state.
- Keep instructions independent of visual position such as “the green button on the right.”

## Rendered-site checks

- Navigate every interactive control with a keyboard and confirm focus is visible.
- Verify the skip link reaches the main content.
- Confirm text and controls remain usable at 200% browser zoom.
- Test at 320, 360, 390, 768, 1024, and 1440 CSS pixels.
- At every width, confirm the page has no horizontal overflow.
- Respect `prefers-reduced-motion`; do not require animation to understand content.

## Portable-output checks

Inspect every generated Word and PDF page for clipped text, broken tables, poor page breaks, missing glyphs, and unclear link text. Confirm Word uses real heading styles so readers can navigate by structure.

