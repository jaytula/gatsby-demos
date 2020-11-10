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

## Creating the SEO component

- Imports

```javascript
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
```

- Then in function component `src/components/seo.js`, create foundation for SEO component.

```jsx
const SEO = ({ description}) => {
  const { site } = useStaticQuery(
    grqphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return null;
}

export default SEO
```

## References

- Facebook uses the [Open Graph](https://developers.facebook.com/docs/sharing/webmasters/#markup) tag format
- Twitter uses `twitter:` keywords. See [Twitter Cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards.html) for more info
- Slack reads tags in the following order ([source](https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254))
  1. oEmbed server
  2. Twitter cards tags / Facebook Open Graph tags
  3. HTML meta tags
- Both Google and Apple offer support for JSON-LD, which is not covered in this guide
  - If you’d like to learn more, check out [this excellent guide](https://nystudio107.com/blog/json-ld-structured-data-and-erotica) for more info on JSON-LD
- Check out the [`gatsby-seo-example`](https://github.com/DSchau/gatsby-seo-example) for a ready-to-use starter for powering your Markdown-based blog.
