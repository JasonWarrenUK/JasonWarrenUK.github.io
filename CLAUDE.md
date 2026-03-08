# Jason Warren — Portfolio

## Project

Single-page portfolio site. SvelteKit + TypeScript (strict) + Tailwind CSS 4. Static site generation via `adapter-static`.

## Stack

- **Framework:** SvelteKit (Svelte 5, runes)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 + CSS custom properties in `src/app.css`
- **Build:** Vite
- **Runtime:** Bun (preferred) or Node
- **Deployment:** Static build to `build/`

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server
bun run build        # Production build (SSG)
bun run preview      # Preview production build
```

## Architecture

- `src/routes/+page.svelte` — Single page composing all sections
- `src/routes/+page.server.ts` — GitHub API data fetching at build time
- `src/lib/components/` — Svelte 5 components (Nav, Hero, About, Section, ProjectCard, Terminal, Artefacts, Contact)
- `src/lib/data/` — Typed project data, artefacts, terminal replay frames
- `src/lib/types/` — TypeScript interfaces
- `src/lib/utils/github.ts` — GitHub REST API helpers (no auth, public repos only)

## Design Tokens

Defined as CSS custom properties in `src/app.css`. Dark palette with warm accents from the Iris project. Three font families: Playfair Display (display), Literata (body), JetBrains Mono (code/terminal).

## Conventions

- Svelte 5 runes (`$state`, `$props`, `$derived`)
- Semantic HTML with proper heading hierarchy
- `prefers-reduced-motion` respected throughout
- No images unless strictly necessary — the site is prose-first
- GitHub data is supplementary; static content works without it
