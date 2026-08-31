# Writing guide

Write for the person completing a task, then make the implementation easy to review.

## Structure

- Use one level-one heading per page.
- Keep heading levels sequential. Do not skip from level two to level four.
- Begin procedures with the reader's goal and prerequisites.
- Use numbered lists for sequences and bullets for unordered choices.
- Put reusable, high-value targets behind deliberate lowercase anchors.

## Language

- Prefer direct verbs: **Select Save**, not **The Save button should be selected**.
- State expected results after important steps.
- Use consistent terms for components and states.
- Avoid “click here,” “read more,” and other links that lose meaning out of context.
- Label fictional values and limitations honestly.

## Cross-references

Use relative Markdown paths and include the stable fragment when linking to a section:

```markdown
[Decision states](../product/architecture.md#decision-states)
```

Run `python scripts/validate_docs.py` before opening a pull request.

## Authoring workflow

1. Identify the reader goal and confirm the product information.
2. Edit Markdown under `docs/`. Treat the website, Word handbook, and PDF as generated outputs.
3. Update explicit navigation when adding or moving a page.
4. Add descriptive links, stable anchors, images, and examples needed by the topic.
5. Run the independent validator and build a local Zensical preview.
6. Review the rendered page for content, accessibility, navigation, and responsive behavior.
7. Open a focused pull request and describe the checks performed.
8. Address human review. Merge only after the required automated gates pass.

After merge, GitHub Actions rebuilds the site and portable files. It then deploys the approved site to GitHub Pages.
