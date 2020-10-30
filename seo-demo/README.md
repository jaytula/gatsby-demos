# Search Engine Optimization (SEO) and Social Sharing Cards with Gatsby

## Implementation

Most important is having a meaningful `title` tag. Some crawlers also respect
`meta` tags but Google does not appear to do so.

## Gatsby + GraphQL

Gatsby distinguishes between page-level queries and component queries.

Page-level queries can use page GraphQL queries (by `export const query`)

Component queries can use `StaticQuery` which is parsed, evaluated and injected
at build time. This allows fallback to sane defaults while providing
extensibility.