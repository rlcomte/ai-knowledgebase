# Maintenance

## Adding Content

1. Add or edit an `.mdx` page under `src/content/docs`.
2. Include all required frontmatter from `docs/content-model.md`.
3. Add related-concept links where the topic crosses areas.
4. Keep source notes accurate and avoid unsupported attribution.
5. Run `npm run validate:content` and `npm run check:links`.

## Reviewing Content

Review dated claims against primary sources before changing `lastReviewed`. The foundation import currently uses `2026-08-25`.

## Regenerating Foundation Pages

Run:

```bash
node scripts/generate-content.mjs
```

This rewrites `src/content/docs`, so review the diff before keeping regenerated output.
