# NOTES

https://www.gatsbyjs.com/tutorial/gatsby-image-tutorial/

## Step 1

```shell
npm install gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

## Step 2

**gatsby-config.js**

```js
module.exports = {
  plugins: ["gatsby-transformer-sharp", "gatsby-plugin-sharp"]
}
```

## Step 3

```shell
npm install gatsby-source-filesystem
```

**gatsby-config.js**

```js
module.exports = {
  plugins: [
    "gatsby-transformer-sharp", 
    "gatsby-plugin-sharp"
    {
      resolve: 'gatsby-source-filesystem', options: { path: './src/data/' }
    }
  ]
}
```

## Step 4

### Querying data for a single image

- Add a bare bones Layout component at `src/components/layout.js
- In `pages/index.js`, add named export `query`:

```jsx
import { graphql } from 'gatsby';

export const query = graphql`
  query {
    file(relativePath: { eq: "headers/headshot.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
```

- Export a React component `HomePage` that uses `Layout` as root component and
has a single child `Img` with attributes `className` `fixed` and `alt`