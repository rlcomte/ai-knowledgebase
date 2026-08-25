# Repository Guidance

## Project

This repository contains an Astro/Starlight static documentation site for the AI Engineering Knowledge Base.

## Commands

- Install dependencies: `npm install`
- Validate frontmatter: `npm run validate:content`
- Type-check Astro: `npm run check`
- Check internal links: `npm run check:links`
- Build: `npm run build`
- Develop locally: `npm run dev`

## Conventions

- Source content is derived from `AI-Engineering-Knowledge-Base-Foundation.md`.
- Imported pages use `lastReviewed: "2026-08-25"`.
- Each docs page must include `title`, `description`, `area`, `order`, `tags` and `lastReviewed`.
- Keep concept pages concise when the source concept is concise.
- Do not attribute detailed Area 2-4 structures directly to Andrew Ng; preserve the reasoned-extension clarification.
- Prefer Astro components and CSS over client-side JavaScript.

## Definition of Done

- Content validation passes.
- Astro diagnostics pass.
- Internal links pass.
- Production build succeeds.
- New pages are reachable through Starlight navigation or related links.
