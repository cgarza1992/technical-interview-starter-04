# H-E-B Interview Starter

A minimal [Next.js](https://nextjs.org) (App Router) starter site for the technical interview.

It includes a homepage, two "Departments" pages that demonstrate **client-side** and
**server-side** data fetching against a local GraphQL API, and a branded red header with the
H-E-B logo and a simple navigation menu. Styling is done with CSS Modules.

## Table of contents

- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [GraphQL API](#graphql-api)
  - [Endpoint](#endpoint)
  - [Schema](#schema)
  - [Example query](#example-query)
  - [Client-side vs. server-side fetching](#client-side-vs-server-side-fetching)
- [Tech notes](#tech-notes)
- [Notes](#notes)

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
  page.module.css     Shared page styles (container/title/content)
  globals.css         Base styles + CSS variables (brand red, etc.)
  departments-client/
    page.tsx                    Departments page (/departments-client)
    DepartmentsList.tsx         Client component: fetches departments in the browser
    DepartmentsList.module.css  Styles for the departments panel
  departments-server/
    page.tsx                    Departments page (/departments-server), fetches on the server
    DepartmentsList.module.css  Styles for the departments panel
  api/
    graphql/
      route.ts        GraphQL Yoga endpoint (/api/graphql)
components/
  Header/
    Header.tsx        Red header bar: logo + nav
    Header.module.css Header styles
public/
  heb-logo.svg        White H-E-B logo
docs/
  plan.md             The original build plan
```

## GraphQL API

A local [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) server runs **inside** the
Next.js app as an [App Router Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).
There is no separate process — it starts with `npm run dev`.

### Endpoint

```
http://localhost:3000/api/graphql
```

Open that URL in a browser for the built-in **GraphiQL** explorer, or `POST` queries to it as
JSON. The schema and resolvers live in [`app/api/graphql/route.ts`](app/api/graphql/route.ts)
and are backed by in-memory sample data.

### Schema

```graphql
type Department {
  id: ID!
  name: String!
  aisle: Int!
}

type Query {
  hello: String!
  departments: [Department!]!
  department(id: ID!): Department
}
```

### Example query

```bash
curl -X POST http://localhost:3000/api/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ hello departments { id name aisle } department(id: \"2\") { name } }"}'
```

### Client-side vs. server-side fetching

The starter includes two pages that fetch the **same** `departments` query from the GraphQL
endpoint, differing only in _where_ the fetch runs:

| Page                      | Route                 | Where it fetches              |
| ------------------------- | --------------------- | ----------------------------- |
| Departments (client-side) | `/departments-client` | In the browser                |
| Departments (server-side) | `/departments-server` | On the server, at render time |

- **Client-side** — [`app/departments-client/DepartmentsList.tsx`](app/departments-client/DepartmentsList.tsx)
  is a `"use client"` component that calls `/api/graphql` with `fetch` inside a `useEffect` and
  renders loading, error, and success states.
- **Server-side** — [`app/departments-server/page.tsx`](app/departments-server/page.tsx) is an
  `async` Server Component that fetches the data at render time (building an absolute URL from
  the request `headers()`), so the list arrives in the initial HTML with no client-side
  JavaScript.

## Tech notes

- **TypeScript** is enabled but **not strict** (`strict: false`), and **JavaScript files are
  allowed** (`allowJs: true`) — so you can add `.js`/`.jsx` alongside `.ts`/`.tsx`.
- **CSS Modules** are used for component- and page-scoped styles; global styles and design
  tokens live in `app/globals.css`.
- The brand red is defined once as the `--heb-red` CSS variable.

## Notes

The H-E-B name and logo are trademarks of their owner and are included here only for this
internal interview starter.
