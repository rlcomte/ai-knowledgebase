# Content Model

Documentation pages live in `src/content/docs` and use Starlight's docs collection.

English pages live at the root of `src/content/docs` and are served without a
locale prefix. Dutch pages live under `src/content/docs/nl` and are served under
`/nl/`. Use the same directory and file names in both locales so Starlight can
match equivalent pages.

Required frontmatter:

```yaml
title: Page title
description: Short search and metadata description
area: Principal section name
order: 1
tags:
  - foundation
lastReviewed: "2026-08-25"
```

Use concise concept pages for short source concepts. Use overview pages to connect concepts into a story, show the key movement statement, and provide concept navigation.

For Dutch pages, translate visible prose, frontmatter `title`, `description` and
`area`, image `alt` text, related-link labels and overview-card labels. Keep
technical terms such as AI Engineering, LLM, RAG, evals, MCP and coding agents in
English when that is clearer for a Dutch technical audience.

Preferred page sections:

- Definition
- Why it matters
- Failure modes
- Evaluation check
- Related concepts
- Source note
