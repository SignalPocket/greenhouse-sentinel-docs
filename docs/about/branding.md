# Branding

Branding belongs in the publishing layer. The source should still make sense as plain Markdown, in GitHub preview, in Word, and in a different web theme.

<a id="five-minute-rebrand"></a>
## Five-Minute Rebrand

1. Open `docs/assets/stylesheets/brand-2026.css`.
2. Replace the values under `:root` for the primary, accent, surface, text, and focus colors.
3. Replace `docs/assets/images/mark.svg` with a square logo that has a meaningful filename.
4. Update `site_name`, `site_author`, and `copyright` in `zensical.toml`.
5. Run the validator and a strict production build.
6. Test the rendered site at the widths in the release checklist.

## Token Approach

The stylesheet maps brand decisions to purpose-based tokens such as `--brand-primary` and `--brand-focus`. Components use those tokens rather than repeating literal colors. This keeps a rebrand small, reviewable, and consistent.

## Content That Should Not Be Branded

Do not embed organization names in reusable technical explanations, hard-code colors into diagrams without a legend, or use a logo as the only way to identify a page. Brand changes should not alter instructions, safety meaning, heading order, or link destinations.
