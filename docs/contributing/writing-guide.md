# Writing guide

Write for the person completing a task, then make the implementation easy to review.

## Structure

- Use one level-one heading per page.
- Keep heading levels sequential; do not skip from level two to level four.
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

