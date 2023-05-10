// Disallow indexing while not in production
export const GET = () =>
  new Response(`User-agent: *
Disallow: /
`)
