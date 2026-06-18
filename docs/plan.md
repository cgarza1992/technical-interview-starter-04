# Starter Website Plan — Next.js Technical Interview Repo

A plan to scaffold a minimal Next.js starter website for a candidate technical interview. The
goal is a clean, easy-to-read starting point: two pages, a branded header, CSS Modules, and a
relaxed TypeScript setup.

## Goals

- Latest Next.js (App Router) project that runs with `npm run dev` out of the box.
- A **homepage** and a **child page**, each with a lorem ipsum title and content area.
- A **red header bar** containing a **white HEB SVG logo** and a **simple navigation menu**.
- Styling via **CSS Modules** (no global UI framework).
- **TypeScript enabled but not strict**, and **JavaScript files allowed** (`allowJs`).

## Tech Stack

| Concern         | Choice                                |
| --------------- | ------------------------------------- |
| Framework       | Next.js (latest), App Router          |
| Language        | TypeScript (non-strict) + JS allowed  |
| Styling         | CSS Modules                           |
| Runtime         | React (bundled with Next.js)          |
| Package manager | npm (swap for pnpm/yarn if preferred) |

## Scaffolding

Create the project in the repo root (or a subfolder, then move files up):

```bash
npx create-next-app@latest . \
  --ts \
  --app \
  --no-tailwind \
  --no-eslint \
  --no-src-dir \
  --import-alias "@/*"
```

> Notes:
>
> - `--no-tailwind` keeps styling to CSS Modules only.
> - ESLint is optional for a starter; enable later if desired.
> - After scaffolding, remove any boilerplate demo markup/styles from the generated
>   `app/page.tsx` and `app/globals.css`.

## Proposed File Structure

```
.
├── docs/
│   └── plan.md
├── public/
│   └── heb-logo.svg          # white HEB logo (see "Assets" below)
├── app/
│   ├── layout.tsx            # root layout, renders <Header/> + page content
│   ├── page.tsx              # homepage
│   ├── page.module.css       # homepage styles
│   ├── globals.css           # minimal resets / base styles
│   └── about/                # the "child page" (rename as desired)
│       ├── page.tsx
│       └── page.module.css
├── components/
│   └── Header/
│       ├── Header.tsx        # red bar + logo + nav
│       └── Header.module.css
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Configuration

### `tsconfig.json` (non-strict, allow JS)

Adjust the generated config so TypeScript is relaxed and JS files are permitted:

```jsonc
{
  "compilerOptions": {
    "strict": false, // non-strict per requirements
    "allowJs": true, // allow .js / .jsx alongside .ts / .tsx
    "checkJs": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "paths": { "@/*": ["./*"] },
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules"],
}
```

## Components & Pages

### Header (`components/Header/Header.tsx`)

- Full-width **red** bar using the HEB brand red: `rgb(225, 37, 27)`.
- White HEB logo on the left (`/heb-logo.svg`), wrapped in a link to `/`.
- Simple nav on the right using Next.js `<Link>`: **Home** (`/`) and the child page (`/about`).
- Styles in `Header.module.css` (flex row, spacing, white link text).
- Define the brand red once as a CSS custom property (e.g. `--heb-red: rgb(225, 37, 27)`) in
  `globals.css` so it can be reused.

### Root layout (`app/layout.tsx`)

- Imports `globals.css`.
- Renders `<Header />` above `{children}` so the header appears on every page.

### Homepage (`app/page.tsx`)

- Lorem ipsum `<h1>` title.
- A content area (`<section>` / `<p>`) with a paragraph of lorem ipsum.
- Scoped styles from `page.module.css`.

### Child page (`app/about/page.tsx`)

- Same structure as the homepage: lorem ipsum title + content area.
- Its own `page.module.css`.

## Assets — HEB Logo

- Save the provided white HEB logo as `public/heb-logo.svg`. It already uses `fill="#fff"`,
  so it renders white against the red bar. The exact markup to use:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 536.28 186.25" aria-hidden="true"><g fill="#fff"><path d="M417.02 104.41h-13.23v14.84h13.71c7.11 0 10.61-2.42 10.61-7.36s-3.86-7.48-11.09-7.48m1.02-31.16h-14.25v16.09h14.77c7.72 0 11.51-2.62 11.51-7.98s-4.18-8.11-12.03-8.11m12.03 8.11c0-5.61-4.18-8.11-12.03-8.11h-14.25v16.09h14.77c7.72 0 11.51-2.62 11.51-7.98m-13.05 23.05h-13.23v14.84h13.71c7.11 0 10.61-2.42 10.61-7.36s-3.86-7.48-11.09-7.48M443.16 0H93.13C41.7 0 0 41.69 0 93.12s41.7 93.13 93.13 93.13h350.03c51.43 0 93.12-41.7 93.12-93.13S494.59 0 443.16 0m0 174.19H93.12c-44.76 0-81.05-36.28-81.05-81.05s36.29-81.05 81.05-81.05h350.04c44.76 0 81.05 36.29 81.05 81.05s-36.29 81.05-81.05 81.05m1.78-150.08-353.63.02c-37.07 0-67.2 30.95-67.17 69.07 0 37.93 30.16 68.88 67.17 68.88l353.63-.07c37.1-.03 67.15-30.89 67.2-68.85-.05-38.2-30.1-69.05-67.2-69.05m-279.8 108.13h-32.67v-27.82h-23.86v27.82H75.93l-4.65-78.29h37.33v35.39h23.86V53.95h37.32zm40.56-27.82h-22.04l-.89-15.08h23.82zm110.11-31.18H256.9v16.1h44.81v15.08H256.9v14.83h56.18l-.76 12.99h-88.1l-4.65-78.29h97.39zm36.77 31.17h-22.04l-.89-15.08h23.82zm108.97 9.03s1.59 18.8-26.4 18.8H371.1l-4.66-78.29h73.29c14.23 0 25.31 8.58 25.28 22.4 0 12.08-6.58 17.85-16.48 20.67 7.69 1.81 13.02 8.46 13.02 16.42m-43.51-40.19h-14.25v16.09h14.77c7.72 0 11.51-2.62 11.51-7.98s-4.18-8.11-12.03-8.11m-1.02 31.16h-13.23v14.84h13.71c7.11 0 10.61-2.42 10.61-7.36s-3.86-7.48-11.09-7.48"></path></g><path fill="#fff" d="M530.34 172.78c0-2.46-1.46-3.54-4.4-3.54h-4.74v12.44h1.88v-5.39h2.17l3.28 5.39h2.11l-3.54-5.48c1.83-.23 3.23-1.2 3.23-3.42Zm-7.25 1.91v-3.86h2.57c1.31 0 2.71.29 2.71 1.83 0 1.92-1.43 2.03-3.03 2.03h-2.26Z"></path><path fill="#fff" d="M525.37 164.67c-5.93 0-10.96 4.57-10.96 10.76s5.02 10.81 10.96 10.81 10.9-4.57 10.9-10.81-5.02-10.76-10.9-10.76m0 19.78c-4.93 0-8.79-3.83-8.79-9.02s3.85-8.96 8.79-8.96 8.73 3.85 8.73 8.96-3.85 9.02-8.73 9.02"></path></svg>
```

> The original source had three duplicate copies of the main logo `<path>` stacked inside
> the `<g>`; the version above keeps a single copy plus the registered-trademark mark. When
> implementing, render it via `next/image` or an inline component and constrain its height in
> `Header.module.css` (e.g. `height: 36px; width: auto`).

- **Brand red:** `rgb(225, 37, 27)` for the header bar.
- **Trademark note:** the HEB name and logo are trademarks. Usage here is for an internal
  interview starter; keep the asset within the repo and avoid redistribution beyond that scope.

## Implementation Steps

1. Scaffold the app with `create-next-app` (settings above).
2. Relax `tsconfig.json` (non-strict, `allowJs`).
3. Add `public/heb-logo.svg` (white HEB logo).
4. Build `components/Header` (red bar + logo + nav) with its CSS Module.
5. Wire `<Header />` into `app/layout.tsx`.
6. Replace boilerplate in `app/page.tsx` with lorem ipsum title + content + `page.module.css`.
7. Create `app/about/page.tsx` (child page) with matching structure + CSS Module.
8. Trim `globals.css` to a minimal reset.
9. Update `README.md` with run instructions for the candidate.

## Verification

- `npm run dev` → app loads at `http://localhost:3000`.
- Header renders on both pages with the white logo on a red bar.
- Nav links move between `/` and `/about` without full page reloads.
- Both pages show a lorem ipsum title and content area.
- `npm run build` completes without type errors.

## Out of Scope

- Authentication, data fetching, APIs, databases.
- Testing setup, CI, deployment config.
- Responsive/mobile polish beyond basic layout (optional stretch goal).

```

```
