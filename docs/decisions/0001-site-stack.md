# 0001. Site stack

## Decision

Use Astro with Starlight, TypeScript, local CSS and small Astro components.

## Context

The brief requires a fully static documentation and learning website with navigation, search, breadcrumbs, previous/next links and accessible documentation conventions. The repository did not contain an existing application stack, so a new Astro/Starlight project structure was created.

## Consequences

- The site builds to static files without a backend.
- Starlight supplies documentation navigation, search and accessibility foundations.
- Custom CSS and local components provide the requested editorial-technical visual identity.
- No client-side framework is required.
