# Codex implementation brief — AI Engineering Knowledge Base website

## Role

Act as a senior frontend engineer, information architect and interaction designer. Build a polished, modern, fully static website from the supplied AI Engineering knowledge-base document.

Work autonomously within the repository. Inspect the workspace before making changes. If a requirement is genuinely impossible because essential input is missing, explain the blocker; otherwise make sensible, documented choices and complete the implementation.

## Goal

Transform `AI-Engineering-Knowledge-Base-Foundation.md` into a production-quality static documentation and learning website for AI Engineering.

The website must:

- explain the four areas of Andrew Ng's AI Engineering Skills Map;
- make a large and growing body of concepts easy to browse and search;
- support both sequential learning and quick reference;
- give Area 3, **Using coding agents**, a particularly detailed and usable structure;
- be suitable for higher-education students, lecturers and practising software engineers;
- be deployable as static files without a backend.

## Source of truth

Use `AI-Engineering-Knowledge-Base-Foundation.md` as the content and information-architecture source. Preserve its conceptual distinctions, qualifications and source links.

Do not silently invent citations or attribute the expanded concepts in Areas 2–4 directly to Andrew Ng. The site must retain the clarification that Ng defines the four top-level areas and has, at the time of writing, elaborated Area 1, while the detailed structures of Areas 2–4 are a reasoned extension for this knowledge base.

You may split the source into multiple Markdown or MDX pages. Do not delete useful source content. Make transformations traceable through clear page titles and a generated content structure.

## Required technology

Use:

- **Astro** as the static-site framework;
- **Starlight** for documentation structure, navigation, search and accessibility;
- **TypeScript** where custom logic is needed;
- local CSS and lightweight Astro components for the visual system;
- only dependencies that are justified and actively needed.

Requirements:

- output must be statically generated;
- no database, server runtime or API key;
- no client-side framework unless a specific interaction requires it;
- minimise JavaScript sent to the browser;
- do not use a generic admin-dashboard aesthetic;
- do not leave the default Starlight appearance substantially unchanged.

If the repository already contains an appropriate static-site stack, inspect it first and preserve it when doing so is more sensible than replacing it. Record the decision in `docs/decisions/0001-site-stack.md`.

## Information architecture

Create these principal sections:

1. **Start here**
   - What is AI Engineering?
   - The four-area skills map
   - How to use this knowledge base
   - Suggested learning paths

2. **Building and deploying AI applications**
   - Overview and conceptual story
   - Machine learning
   - Deep learning
   - Foundation models and LLMs
   - Prompt engineering
   - Context engineering
   - Grounding and RAG
   - Embeddings, vector search, graphs and semantic layers
   - Tool calling and MCP
   - Agentic workflows and harnesses
   - Evals and error analysis
   - Production operations, observability, cost and latency
   - Human oversight and guardrails

3. **Software engineering fundamentals**
   - Overview and conceptual story
   - Requirements and design
   - Architecture and interfaces
   - Data modelling and data engineering
   - Code quality and version control
   - Testing and testability
   - Security, privacy and accessibility
   - DevOps, deployment and observability
   - Technical debt, documentation and teamwork

4. **Using coding agents**
   - Overview and conceptual story
   - Coding assistants versus coding agents
   - Model, harness, tools and workspace
   - The agent loop
   - Context, instructions and planning
   - Configuration, permissions and sandboxing
   - Principles for effective use
   - The ten-step working method
   - Task briefs and examples
   - Multiple agents and subagents
   - Delegation, handoffs and orchestration
   - Multi-agent patterns
   - Coordination risks and concurrency safety
   - Evaluating coding agents
   - Governance and human decision boundaries

5. **Shaping the build**
   - Overview and conceptual story
   - Problem framing and stakeholder analysis
   - User and workflow research
   - AI suitability
   - Deterministic–probabilistic boundaries
   - Value, feasibility, viability and responsibility
   - Product hypotheses and prototypes
   - Specifications, quality attributes and acceptance criteria
   - Risk and responsible AI
   - Outcomes and learning loops
   - Shaping canvas

6. **Cross-cutting knowledge**
   - Evals as the spine
   - Quality model for AI software
   - Patterns
   - Anti-patterns
   - Glossary
   - Sources

Create one useful overview page per principal section and separate concept pages where the source supports them. For concepts that currently have only a short explanation, create concise reference pages rather than padding them with generic prose.

## Navigation and discovery

Implement:

- persistent desktop sidebar and accessible mobile navigation;
- full-text local search;
- breadcrumbs;
- previous/next navigation;
- an “On this page” table of contents for long pages;
- prominent links between related concepts in different areas;
- tags or small semantic labels such as `foundation`, `practice`, `architecture`, `evaluation`, `governance`;
- a glossary with anchorable terms;
- no broken internal links.

Add three learning paths:

- **Foundation path** — for students new to AI Engineering;
- **Builder path** — for engineers building and deploying AI applications;
- **Agentic development path** — for engineers who want to work effectively with coding agents.

Each path should show an ordered sequence, expected prior knowledge and a short explanation of the outcome.

## Homepage

Design a distinctive homepage with:

- a concise hero statement: **Build AI systems that are useful, reliable and responsible**;
- a short explanation of AI Engineering;
- a visual four-area map with four large interactive cards;
- a clear indication that the four areas form a cycle rather than isolated silos;
- an “Evals connect everything” callout;
- three learning-path cards;
- a “Start with the foundations” primary action;
- a “Explore coding agents” secondary action;
- a small source note acknowledging Andrew Ng's skills map without suggesting endorsement.

The homepage should communicate hierarchy immediately. Avoid a wall of text.

## Visual direction

Create a modern editorial–technical style: calm, authoritative, precise and visually distinctive.

Use this direction:

- generous whitespace and a strong typographic scale;
- deep ink/navy as the primary text and dark background colour;
- warm off-white page backgrounds;
- a restrained electric cyan or blue accent for links and Area 1;
- violet for Area 2;
- amber for Area 3;
- green for Area 4;
- subtle gradients only in hero and area accents;
- fine borders, soft shadows and medium-radius cards;
- monospace styling for technical terms and code;
- restrained motion that respects `prefers-reduced-motion`;
- diagram-like lines or nodes as a subtle recurring visual motif;
- no stock photography and no decorative AI-brain imagery.

Define all design tokens as CSS custom properties. Ensure colour contrast meets WCAG 2.2 AA.

Create a typographic system using privacy-friendly local/system font stacks. Do not depend on Google Fonts at runtime.

## Reusable components

Build reusable Astro/MDX components for:

- `AreaCard`
- `ConceptCard`
- `ConceptGrid`
- `LearningPath`
- `Definition`
- `KeyIdea`
- `Tradeoff`
- `FailureMode`
- `EvaluationCheck`
- `RelatedConcepts`
- `SourceNote`
- `FourAreaMap`

Components must degrade gracefully in print and without JavaScript.

## Content presentation

Convert large source tables thoughtfully:

- keep tables for exact comparisons and compact mappings;
- use cards or definition lists when scanning is more important than column comparison;
- preserve the full explanation of each concept;
- break very long pages into meaningful subpages;
- use callouts sparingly and consistently;
- show the “key movement” statement prominently on each area overview;
- render the ten-step coding-agent method as a readable process/timeline;
- render the shaping canvas as a practical worksheet-style page;
- render cross-area relationships as an accessible HTML/CSS visual, not an inaccessible image.

Add frontmatter to each content page with at least:

```yaml
title:
description:
area:
order:
tags:
lastReviewed:
```

Use `2026-08-25` as `lastReviewed` for imported foundation content.

## Accessibility

Meet WCAG 2.2 AA as far as reasonably testable. Specifically:

- semantic landmarks and heading hierarchy;
- visible keyboard focus;
- skip link;
- keyboard-operable menus and interactive cards;
- no colour-only communication;
- appropriate labels and accessible names;
- sufficient contrast in light and dark themes;
- responsive text and reflow at 320 CSS pixels;
- reduced-motion support;
- tables usable on narrow screens;
- diagrams accompanied by equivalent text.

## Responsive behaviour

Support:

- small mobile screens from 320 px;
- tablets;
- laptop and large desktop layouts;
- print styles for concept and worksheet pages.

Do not solve desktop layout by scaling the complete page down. Reflow content and navigation properly.

## SEO and metadata

Add:

- meaningful page titles and descriptions;
- canonical-ready metadata configuration;
- Open Graph metadata with a local generated social-card asset;
- sitemap;
- robots.txt;
- favicon and simple logo mark created as local SVG;
- semantic URLs;
- structured data where appropriate for an educational/reference website.

The website title is **AI Engineering Knowledge Base**.

## Repository deliverables

Create or update:

- the complete Astro/Starlight website;
- all content pages derived from the source document;
- `README.md` with install, development, build and deployment instructions;
- `AGENTS.md` with concise repository guidance, commands, conventions, constraints and definition of done;
- `docs/decisions/0001-site-stack.md`;
- `docs/content-model.md` describing frontmatter and page conventions;
- `docs/maintenance.md` explaining how to add and review content;
- automated link checking if practical within the chosen stack;
- a small content-validation script that detects missing required frontmatter;
- a GitHub Actions workflow that installs dependencies, validates content, lints/type-checks and builds the site;
- `.gitignore` and appropriate project configuration.

Use the package manager already established by the repository. If none exists, use `npm` and commit the lockfile.

## Implementation process

1. Inspect the repository and the source Markdown.
2. Write a short implementation plan before changing files.
3. Scaffold or adapt the Astro/Starlight project.
4. Establish content collections, navigation and design tokens.
5. Convert the source into the planned page structure.
6. Build the homepage and reusable components.
7. Add responsive, dark-theme, print and accessibility styling.
8. Add validation, metadata and repository documentation.
9. Run all checks and fix failures.
10. Review the final result as a user: navigation, search, links, mobile layout and representative pages from all four areas.

Do not stop after scaffolding. Complete the content conversion and visual customisation.

## Verification

At minimum, run the appropriate commands for:

- dependency installation;
- Astro diagnostics/type checking;
- content/frontmatter validation;
- linting or formatting checks if configured;
- production build;
- internal-link validation;
- a local preview or equivalent inspection.

Inspect the generated homepage and at least these pages:

- What is AI Engineering?
- Context engineering
- Evals and error analysis
- Software architecture
- How coding agents work
- Multi-agent orchestration
- Shaping the build
- Shaping canvas

If browser automation or screenshots are available, inspect desktop and mobile renders and correct visual defects. If they are not available, state that limitation in the handoff without claiming visual inspection occurred.

## Done when

The task is complete only when:

- the production build succeeds;
- the site is fully static;
- all four areas are represented by coherent landing pages and concept navigation;
- Area 3 contains the detailed coding-agent structure from the source;
- the source content has been preserved and meaningfully divided across pages;
- search, navigation, breadcrumbs and previous/next links work;
- the homepage has a clearly customised modern visual identity;
- layouts work at mobile and desktop widths;
- no obvious accessibility or contrast failure remains;
- no broken internal link remains;
- documentation explains how to run, deploy and extend the site;
- the final response lists implemented outcomes, verification evidence and any genuine remaining limitations.

## Final handoff format

Return:

1. a concise summary of what was built;
2. the main architectural and design decisions;
3. the exact commands run and their outcomes;
4. the most important files and directories;
5. deployment instructions;
6. any limitations or recommended next content iteration.

Do not provide a success claim unsupported by the verification output.

