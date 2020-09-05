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

### Querying for multiple images from YAML data

- Get a couple of unsplash images and place in `src/data`
- Get the `gatsby-transformer-yaml` and add in `gatsby-config.js`
- Create `speaking.yaml` file in `src/data` containing

```yaml
- image: headers/headshot.jpg
```

- Create new page `pages/sourced-from-yaml.js`

```jsx
import React from 'react'
import Img from 'gatsby-image'
import {graphql} from 'gatsby'
import Layout from '../components/layout'

const SourcedFromYaml = ({data}) => {
  return <Layout>
    <pre>
    {JSON.stringify(data)}
    </pre>
  </Layout>
}

export const query = graphql`
  {
    allSpeakingYaml {
      edges {
        node {
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default SourcedFromYaml
```

### Using Static Query

Use static query instead if component is part of a reusable component:

**/src/components/header-image.js**

```jsx
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const HeaderImage = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "strawberry-jam.jpg" }) {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  
  return <Img fixed={data.file.childImageSharp.fixed} />
}

export default HeaderImage
```

**/pages/static-query-demo.js**

```jsx
import React from 'react'
import HeaderImage from '../components/header-image'

const StaticQueryDemo = () => {
  return (
    <div>
      <h1>StaticQueryDemo</h1>
      <HeaderImage />
    </div>
  )
}

export default StaticQueryDemo
```

### Multiple queries and aliasing

- Create `pages/multiple-queries-demo.js`

```jsx
import React from 'react'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'


const MultipleQueriesDemo = ({data}) => {
  return <Layout>
    <h1>Multiple Queries Demo</h1>
    <h2>allSpeakingYaml</h2>

    <h2>banner</h2>

    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </Layout>
}

export default MultipleQueriesDemo

export const query = graphql`
{
  allSpeakingYaml {
    edges {
      node {
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
  banner: file(relativePath: { eq: "strawberry-jam.jpg" }) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`
```