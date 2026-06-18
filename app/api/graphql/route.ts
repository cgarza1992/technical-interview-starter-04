import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

// `fetchAPI.Response` ties Yoga's response into the Next.js Route Handler runtime.
const { handleRequest } = createYoga({
  schema,
  // Route Handlers live at /api/graphql; tell Yoga so GraphiQL points to the right URL.
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export function GET(request: Request) {
  return handleRequest(request, {});
}

export function POST(request: Request) {
  return handleRequest(request, {});
}

export function OPTIONS(request: Request) {
  return handleRequest(request, {});
}
