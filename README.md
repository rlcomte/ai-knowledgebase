# AI Engineering Knowledge Base

A static Astro/Starlight documentation website generated from `AI-Engineering-Knowledge-Base-Foundation.md`.

## Commands

```bash
npm install
npm run validate:content
npm run check
npm run check:links
npm run build
npm run dev
```

## Structure

- `src/content/docs/` contains the Starlight documentation pages.
- `src/components/` contains reusable Astro components for concept cards, learning paths, callouts and area maps.
- `src/styles/` contains local design tokens and site styling.
- `scripts/generate-content.mjs` regenerates imported foundation content.
- `scripts/validate-content.mjs` checks required frontmatter.
- `scripts/check-links.mjs` checks internal documentation links.

## Deployment

The site is fully static. Run `npm run build` and deploy the generated `dist/` directory to any static host.

The configured `site` URL in `astro.config.mjs` is a placeholder and should be changed before production deployment.
