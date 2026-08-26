# Maintenance

## Adding Content

1. Add or edit an `.mdx` page under `src/content/docs`.
2. Add or edit the matching Dutch page under `src/content/docs/nl` using the same path.
3. Include all required frontmatter from `docs/content-model.md`.
4. Add related-concept links where the topic crosses areas.
5. Keep source notes accurate and avoid unsupported attribution.
6. Run `npm run validate:content` and `npm run check:links`.

## Maintaining Dutch Content

Run the Dutch localization helper after copying or regenerating English pages:

```bash
node scripts/localize-dutch-content.mjs
```

This normalizes Dutch titles, area labels, common headings, `/nl/` links and
relative asset imports. It does not replace human review of translated prose.

## Reviewing Content

Review dated claims against primary sources before changing `lastReviewed`. The foundation import currently uses `2026-08-25`.

## Regenerating Foundation Pages

Run:

```bash
node scripts/generate-content.mjs
```

This rewrites `src/content/docs`, so review the diff before keeping regenerated output.
Regenerate or update the matching Dutch pages before merging so locale coverage
continues to pass validation.
