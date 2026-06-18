# H-E-B Interview Starter

A minimal [Next.js](https://nextjs.org) (App Router) starter site for the technical interview.

It includes a homepage, a child page, and a branded red header with the H-E-B logo and a simple
navigation menu. Styling is done with CSS Modules.

## Requirements

- **Node.js** `>= 20.9` (the repo targets the current LTS — see [`.nvmrc`](.nvmrc), which pins
  Node 24). If you use `nvm`, run `nvm use`.
- **npm** (ships with Node).

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server with hot reload |
| `npm run build` | Create a production build            |
| `npm run start` | Run the production build locally     |

## Project structure

```
app/
  layout.tsx          Root layout (renders the Header + page content)
  page.tsx            Homepage (/)
  page.module.css     Shared page styles (used by both pages)
  globals.css         Base styles + CSS variables (brand red, etc.)
  about/
    page.tsx          Child page (/about)
components/
  Header/
    Header.tsx        Red header bar: logo + nav
    Header.module.css Header styles
public/
  heb-logo.svg        White H-E-B logo
docs/
  plan.md             The original build plan
```

## Tech notes

- **TypeScript** is enabled but **not strict** (`strict: false`), and **JavaScript files are
  allowed** (`allowJs: true`) — so you can add `.js`/`.jsx` alongside `.ts`/`.tsx`.
- **CSS Modules** are used for component- and page-scoped styles; global styles and design
  tokens live in `app/globals.css`.
- The brand red is defined once as the `--heb-red` CSS variable.

## Notes

The H-E-B name and logo are trademarks of their owner and are included here only for this
internal interview starter.
