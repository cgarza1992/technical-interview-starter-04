# AGENTS.md

Minimal **Next.js (App Router)** starter in **TypeScript** with **CSS Modules**. Used for a technical interview. See [README.md](README.md) for project structure, scripts, and tech notes — don't duplicate that here.

## Commands

- `npm install` — install dependencies (Node `>= 20.9`; run `nvm use` to match [`.nvmrc`](.nvmrc)).
- `npm run dev` — dev server with hot reload at http://localhost:3000.
- `npm run build` — production build; use this to verify a change compiles (there is no separate typecheck or lint script).
- `npm run start` — serve the production build.

There are **no tests, linter, or formatter** configured. Don't assume `npm test`/`npm run lint` exist.

## Conventions

Stick to web and Next.js/React framework standards. Match the existing patterns:

- **App Router only.** Routes live in [app/](app/) as `page.tsx` files. Keep components as Server Components by default; only add `"use client"` when a component needs browser APIs, state, or effects.
- **CSS Modules** for all component/page styles (`*.module.css`), imported as `styles` and applied via `className={styles.x}`. Global styles and design tokens live in [app/globals.css](app/globals.css).
- **Use CSS variables for design tokens**, not hardcoded values. Brand red is `var(--heb-red)`; content width is `var(--content-max-width)`. Add new tokens to `:root` in `globals.css`.
- **Path alias `@/*`** maps to the repo root (e.g. `import Header from "@/components/Header/Header"`). Use it for cross-directory imports.
- **Co-locate** a component with its module CSS in a named folder (see [components/Header/](components/Header/)).
- Use **`next/link`** for navigation and **`next/image`** for images (with `width`/`height` and `alt`), as in [components/Header/Header.tsx](components/Header/Header.tsx).
- **Default-export** React components named in PascalCase.

## Gotchas

- **TypeScript is non-strict** (`strict: false`) and `allowJs: true` — `.js`/`.jsx` may sit alongside `.ts`/`.tsx`. Still prefer typed `.tsx` for new code.
- `npm run build` is the only compile check — run it after non-trivial changes.
- Don't add a state library, CSS framework, or extra dependencies unless the task requires it; keep the stack minimal.
