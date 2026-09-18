# Codex implementation brief — themed knowledgebase website

## Role

Act as a senior frontend engineer, information architect, content-engineering specialist and interaction designer. Build a polished, fully static knowledgebase website from the supplied content description.

Work autonomously within the repository. Inspect the existing workspace before making changes. Preserve useful existing infrastructure when it already satisfies the requirements. Do not stop at scaffolding: complete the content generation, navigation, visual customization and verification.

## Goal

Create a new knowledgebase that is structurally and visually similar to the existing AI Engineering Knowledge Base, while allowing the subject matter, theme map, subthemes and concepts to be replaced through one authoritative content-description file.

The site must:

- make a large and growing body of knowledge easy to browse and search;
- support sequential learning as well as quick reference;
- represent themes, subthemes and concepts clearly;
- preserve the hierarchy and relationships supplied by the content description;
- be suitable for the audience specified by the content description;
- be deployable as static files without a backend;
- use `#aa334d` as its primary brand accent while preserving the existing visual system and semantic colors.

## Source of truth

Use this file as the authoritative input:

```text
sources/KNOWLEDGEBASE_CONTENT_DESCRIPTION.md
```

The content description is expected to be generated or prepared by ChatGPT before implementation. It must contain the complete product and content specification: site identity, audience, learning goals, themes, subthemes, concepts, ordering, relationships, tags, source notes, and language requirements.

Do not silently invent topics, concepts, relationships, citations, claims or hierarchy. If the content description omits optional presentation details, use the existing knowledgebase conventions and document the assumption. If it omits essential content or site identity, report the specific missing input rather than fabricating it.

## Content-description contract

Require the source file to use this structure. The prose beneath each heading remains the editorial source; the metadata blocks make generation deterministic.

````markdown
# Knowledgebase Content Description

## Site metadata

```yaml
siteTitle: Example Knowledgebase
siteDescription: A concise description of the knowledgebase.
defaultLanguage: en
supportedLanguages: [en, nl]
audience:
  - students
  - practitioners
learningGoals:
  - Understand the core concepts.
  - Apply the concepts responsibly.
sourcePolicy: Preserve supplied claims and citations; do not invent attribution.
reviewDate: "2026-08-25"
```

## Themes

```yaml
themes:
  - id: theme-one
    title: Theme One
    description: What this theme covers.
    keyMovement: The main conceptual movement in this theme.
    order: 1
    tags: [foundation, practice]
    subthemes:
      - id: subtheme-one
        title: Subtheme One
        description: What this subtheme covers.
        order: 1
        tags: [foundation]
        concepts:
          - id: concept-one
            title: Concept One
            description: A concise reference description.
            order: 1
            tags: [foundation]
            prerequisites: []
            related: [concept-two]
            sourceRefs: [source-1]
```

## Learning paths

```yaml
learningPaths:
  - id: foundation
    title: Foundation path
    priorKnowledge: No prior knowledge beyond general literacy.
    outcome: What learners can do after completing the path.
    steps: [concept-one, concept-two]
```

## Sources and notes

```yaml
sources:
  - id: source-1
    label: Source title
    url: https://example.com/source
    note: How this source should be used or attributed.
```

Additional Markdown sections may provide the full editorial content for each theme, subtheme and concept. Preserve that content and divide it into meaningful pages rather than padding concise concepts with generic prose.
````

The implementation may use a stricter equivalent format if the source file already establishes one, but the generator must validate identifiers, ordering, references and required fields before writing pages.

## Required technology

Use:

- Astro as the static-site framework;
- Starlight for documentation structure, navigation, search and accessibility;
- TypeScript where custom logic is needed;
- local CSS and lightweight Astro components for the visual system;
- only dependencies that are justified and actively needed.

Requirements:

- generate a fully static site;
- use no database, server runtime or API key;
- use no client-side framework unless a specific interaction requires it;
- minimize JavaScript sent to the browser;
- do not leave the default Starlight appearance substantially unchanged;
- preserve the existing npm-based workflow if this repository already uses it.

If the repository already contains an appropriate Astro/Starlight implementation, adapt it rather than replacing it. Record important architectural decisions in `docs/decisions/`.

## Information architecture

Generate navigation and pages from the content description.

At minimum, provide:

1. A homepage with the site identity, purpose, audience and primary entry points.
2. One overview page per theme.
3. One overview page per subtheme when subthemes are present.
4. One concept/reference page per supplied concept.
5. Learning-path pages or sections for every supplied learning path.
6. A glossary or reference index when defined by the content description.
7. A sources page or source notes when citations or references are supplied.
8. A status or coverage page showing concept metadata when useful.

Use semantic, stable URLs derived from IDs. Do not use titles as the sole identity because titles may change.

Each theme overview should include:

- the theme description;
- its key movement, if supplied;
- links to subthemes and concepts;
- tags and prerequisites where relevant;
- related themes or cross-cutting concepts;
- an accessible HTML/CSS visual summary when a map is defined.

Each concept page should include, where available:

- definition or overview;
- why it matters;
- key ideas;
- structure, process or examples;
- tradeoffs;
- failure modes;
- evaluation or application checks;
- prerequisites;
- related concepts;
- source notes.

Do not force every section onto every page. Use only sections supported by the source content.

## Navigation and discovery

Implement:

- persistent desktop sidebar;
- accessible mobile navigation;
- full-text local search through Starlight;
- breadcrumbs;
- previous/next navigation;
- an “On this page” table of contents for long pages;
- prominent links between related themes and concepts;
- tags or small semantic labels;
- anchorable glossary terms where a glossary is supplied;
- no broken internal links.

Generate sidebar groups from the theme and subtheme hierarchy. Respect explicit `order` values. Fall back to stable source order only when no order is supplied.

## Homepage

Design a distinctive homepage with:

- a concise statement of the knowledgebase’s purpose;
- a short explanation of the subject and intended audience;
- a visual theme map with large, interactive theme cards;
- a clear indication of relationships or progression between themes when supplied;
- a primary action to begin with the recommended foundation;
- secondary actions for exploration and reference;
- learning-path cards when learning paths are supplied;
- a source note and review date where appropriate.

Avoid a wall of text. The hierarchy, starting point and major themes must be understandable at a glance.

## Visual direction

Preserve the existing knowledgebase’s editorial–technical style:

- generous whitespace;
- strong typographic hierarchy;
- calm, authoritative, precise presentation;
- warm or cool neutral surfaces;
- fine borders, soft shadows and medium-radius cards;
- restrained gradients in hero and theme accents;
- monospace styling for technical terms and code;
- subtle diagram-like lines or nodes when appropriate;
- no stock photography or decorative AI-brain imagery;
- restrained motion respecting `prefers-reduced-motion`.

Define all design tokens as CSS custom properties.

### Primary brand color requirement

The new site’s primary brand color is:

```text
#aa334d
```

Apply it as the replacement for the current blue primary/accent family. Derive accessible variants for:

- primary action buttons;
- links;
- focus indicators;
- hover states;
- light-theme containers;
- dark-theme containers;
- hero accents and gradients;
- Starlight accent tokens.

Preserve the rest of the visual system unless the content description explicitly requires otherwise:

- neutral backgrounds and surfaces;
- typography and spacing;
- border and shadow treatment;
- status colors;
- theme-specific accent colors;
- dark-mode structure.

Do not mechanically replace every color in the repository with `#aa334d`. The requested change is a primary brand-accent change, not a monochrome redesign.

Verify light and dark variants for WCAG 2.2 AA contrast. If the raw color does not provide sufficient contrast for text, use an accessible derived shade for text while retaining `#aa334d` for large surfaces, borders or decorative accents.

## Reusable components

Build or adapt reusable Astro/MDX components for:

- `ThemeCard`;
- `SubthemeCard`;
- `ConceptCard`;
- `ConceptGrid`;
- `LearningPath`;
- `Definition`;
- `KeyIdea`;
- `Tradeoff`;
- `FailureMode`;
- `EvaluationCheck`;
- `RelatedConcepts`;
- `SourceNote`;
- `ThemeMap`;
- `StatusBadge` or equivalent metadata display.

Components must degrade gracefully in print and without JavaScript. Interactive cards must be real links or buttons with accessible names and keyboard behavior.

## Content generation

Create or adapt a deterministic generator, for example:

```text
scripts/generate-content.mjs
```

The generator must:

1. Read `sources/KNOWLEDGEBASE_CONTENT_DESCRIPTION.md`.
2. Validate required metadata and identifiers.
3. Validate unique IDs and ordering.
4. Validate all `related`, `prerequisites`, `steps` and `sourceRefs` references.
5. Generate English pages under `src/content/docs/`.
6. Generate Dutch pages under `src/content/docs/nl/` when Dutch is configured.
7. Generate or update navigation data from the same source.
8. Preserve editorial Markdown sections and MDX components.
9. Avoid overwriting unrelated manually maintained files.
10. Fail with actionable errors when the source is invalid.

Generated pages must include the repository’s required frontmatter fields:

```yaml
title:
description:
area:
order:
tags:
lastReviewed:
status:
lastModified:
```

Use the source review date for imported content unless a page explicitly supplies a different review date. Use a valid status value already accepted by the repository validator.

If translations are generated automatically, preserve MDX syntax, links, identifiers, code blocks and component structure. Internal Dutch links must use the `/nl/` prefix.

## Localization

Match the current repository’s bilingual setup unless the content description explicitly requests another configuration:

- English is the root locale.
- Dutch is served under `/nl/`.
- Navigation labels, component labels and page content are locale-aware.
- Every English page has a matching Dutch page.
- Locale coverage is checked automatically.

Keep technical terms in their established English form when that is natural and useful. Do not translate identifiers, URLs, code, frontmatter keys or component names.

## Content presentation

Choose presentation based on the supplied content:

- use tables for exact comparisons and compact mappings;
- use cards or definition lists for scanning;
- use process/timeline layouts for ordered methods;
- use worksheet-style layouts for canvases or practical frameworks;
- use accessible HTML/CSS visuals for maps and relationships;
- accompany every diagram with equivalent text;
- use callouts sparingly and consistently;
- keep concise source concepts concise.

## Accessibility

Meet WCAG 2.2 AA as far as reasonably testable:

- semantic landmarks and heading hierarchy;
- visible keyboard focus;
- skip link;
- keyboard-operable navigation and cards;
- no color-only communication;
- accessible names and labels;
- sufficient light/dark contrast;
- responsive reflow at 320 CSS pixels;
- reduced-motion support;
- narrow-screen table handling;
- text alternatives for diagrams and maps;
- print-friendly concept and worksheet pages.

## Responsive behavior

Support:

- 320 px mobile screens;
- tablets;
- laptop and large desktop layouts;
- print output for reference and worksheet pages.

Reflow content and navigation properly. Do not solve desktop layout by scaling the complete page down.

## SEO and metadata

Add:

- meaningful page titles and descriptions;
- canonical-ready site configuration;
- Open Graph metadata with a local social-card asset;
- sitemap;
- robots.txt;
- favicon and simple local SVG logo mark;
- semantic URLs;
- structured data appropriate for an educational/reference website.

Use the site title and description from the content description rather than hard-coding the previous AI Engineering identity.

## Repository deliverables

Create or update:

- the complete Astro/Starlight website;
- the content-description validator and generator;
- generated content pages and navigation;
- reusable components;
- design tokens and site styles;
- `README.md` with install, development, build and deployment instructions;
- `AGENTS.md` with repository guidance and definition of done;
- `docs/content-model.md` describing the content-description contract and frontmatter;
- `docs/maintenance.md` explaining how to add, review and regenerate content;
- `docs/decisions/0001-site-stack.md` when the stack decision is new or changed;
- internal-link checking;
- content/frontmatter validation;
- `.gitignore` and appropriate project configuration;
- a GitHub Actions workflow when CI is part of the repository’s conventions.

Use the package manager already established by the repository. If none exists, use npm and commit the lockfile.

## Implementation process

1. Inspect the repository and the content description.
2. Inspect the current Astro/Starlight implementation before changing it.
3. Write or update the implementation decision record.
4. Establish the content schema and validation rules.
5. Implement deterministic content generation.
6. Generate theme, subtheme and concept pages.
7. Generate navigation, relationships and learning paths.
8. Build or adapt the homepage and reusable components.
9. Apply the `#aa334d` primary color family with accessible light/dark variants.
10. Add responsive, print, accessibility and reduced-motion styling.
11. Add metadata, validation and repository documentation.
12. Run all checks and fix failures.
13. Review the final site as a user on representative desktop and mobile pages.

Do not stop after scaffolding or after generating only placeholder pages.

## Verification

Run the appropriate commands for:

```bash
npm install
npm run validate:content
npm run check
npm run check:links
npm run build
```

Also verify, where available:

- local development or preview server startup;
- generated route coverage;
- light and dark theme rendering;
- mobile navigation;
- keyboard focus;
- reduced-motion behavior;
- contrast of primary text, links, buttons and focus states;
- representative theme, subtheme and concept pages;
- homepage, learning paths, glossary and source pages.

If browser automation or screenshots are unavailable, state that limitation in the final handoff without claiming visual inspection occurred.

## Definition of done

The task is complete only when:

- the production build succeeds;
- the site is fully static;
- the content description is the authoritative source for generated structure;
- themes, subthemes and concepts are represented coherently;
- navigation, search, breadcrumbs and previous/next links work;
- relationships and learning paths resolve without broken links;
- the homepage has a customized visual identity;
- `#aa334d` is used as the primary brand accent with accessible variants;
- layouts work at mobile and desktop widths;
- no obvious accessibility or contrast failure remains;
- all required frontmatter and locale checks pass;
- no broken internal links remain;
- documentation explains how to run, regenerate, deploy and extend the site;
- the final response reports implemented outcomes, verification evidence and genuine limitations.

## Final handoff format

Return:

1. A concise summary of what was built.
2. The content-source and generation model.
3. The main architectural and design decisions.
4. The primary-color implementation and contrast verification.
5. The exact commands run and their outcomes.
6. The most important files and directories.
7. Deployment instructions.
8. Any limitations or recommended next content iteration.

Do not claim success without verification output.
