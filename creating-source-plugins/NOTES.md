# Notes

URL: https://www.gatsbyjs.org/tutorial/source-plugin-tutorial/

## Set up projects for plugin development

### Set up an example site

```shell
gatsby new example-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

### Set up a source plugin

```shell
gatsby new source-plugin https://github.com/gatsbyjs/gatsby-starter-plugin
```

### Install your plugin in the example site

Add `source-plugin` to `plugins` array in `gatsby-config.js`

```js
module.exports = {
  plugins: [require.resolve(`../source-plugin`)],
}
```

Run `gatsby develop` and note that when starting up there is:

```shell
Loading gatsby-starter-plugin
```

Which is from the export `onPreInit` from `gatsby-node.js`.

## Source data and create nodes

### Create nodes inside of `sourceNodes` with the `createNode` function

Change `gatsby-node.js` to the following:

```js
// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Post`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const data = {
    posts: [
      { id: 1, description: `Hello world!` },
      { id: 2, description: `Second post!` },
    ],
  }

  // loop through data and create Gatsby nodes
  data.posts.forEach(post =>
    createNode({
      ...post,
      id: createNodeId(`${POST_NODE_TYPE}-${post.id}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    })
  )

  return
}
```

The above:

- Implements `sourceNodes` API which will run as part of Gatsby bootstrap process.
- Gatsby helpers pulled out: `createContentDigtest` and `createNodeId`
- Provided required fields for the node:
  - node ID creation
  - content digest for tracking dirty nodes
- Created `data.posts` array for testing and calling `createNode` on each post

Run the following graphql query to verify node creation

```graphql
query {
  allPost {
    nodes {
      id
      description
    }
  }
}
```

## Querying and sourcing data from a remote location

### Adding dependencies

```shell
npm install apollo-cache-inmemory apollo-client apollo-link apollo-link-http graphql graphql-tag node-fetch ws subscriptions-transport-ws
```

### Configure an Apollo client to fetch data

- Create an `ApolloClient` as `client`.  Takes in an object with keys `link` and `cache`.
- For `link`, we use `apollo-link` `split` whereby the first argument is a test to determine whether to flow to the first link or
  the optional second link 

### Query Data from the API

1. Replace hardcoded data in `gatsby-node`'s `sourcesNode` with a GraphQL query using the `client` just created:

```js
const { data } = await client.query({
  query: gql`
    query {
      posts {
        id
        description
        slug
        imgUrl
        imgAlt
        author {
          id
          name
        }
      }
      authors {
        id
        name
      }
    }
  `
});
```

2.  Create author nodes in `sourcesNode`:

```js

const AUTHOR_NODE_TYPE = `Author` 


exports.sourceNodes = async ({actions}) {
  // ....

  data.authors.forEach(author =>
    createNode({
      ...author,
      id: createNodeId(`${AUTHOR_NODE_TYPE}-${author.id}`), // hashes the inputs into an ID
      parent: null,
      children: [],
      internal: {
        type: AUTHOR_NODE_TYPE,
        content: JSON.stringify(author),
        contentDigest: createContentDigest(author),
      },
    })
  )
}
```

3. Check in GraphiQL that it is working:

```gql
query {
  allPost {
    nodes {
      id
      description
      imgUrl
    }
  }
  allAuthor {
    nodes {
      id
      name
    }
  }
}
```

## Optimize remote images

### Create `remoteFileNode`'s from a URL

- Add `gatsby-source-filesystem` to `source-plugin` project
- In `gatsby-node.js`, import `createRemoteFileNode` helper from `gatsby-source-filesystem`
- Export new function `onCreateNode`, like so:

```js
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === POST_NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.imgUrl,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) {
      node.remoteImage___NODE = fileNode.id
    }
  }
}
```

### Transform `File` nodes with sharp plugins

1. Install in `example-site` project (*not* the plugin)

```shell
npm install gatsby-plugin-sharp gatsby-transformer-sharp
```

2. Include these after the `source-plugin` in `gatsyb-config.js`

3. Check in graphiql for `childSharpImage`

## Create foreign key relationships between data

Add `exports.createSchemaCustomization`:

```js
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Post implements Node {
      id: ID!
      slug: String!
      description: String!
      imgUrl: String!
      imgAlt: String!
      # create relationships between Post and File nodes for optimized images
      remoteImage: File @link
      # create relationships between Post and Author nodes
      author: Author @link(from: "author.name" by: "name")
    }
    type Author implements Node {
      id: ID!
      name: String!
    }`)
}
```

- Drop the `___NODE` in `exports.onCreateNode` `node.remoteImage` assignment to `fileNode.id`

- Do a `gatsby clean` to ensure `onCreateNode` runs
- Run in graphiql to check:

```graphql
query {
  allPost {
    nodes {
      id
      author {
        name
      }
      remoteImage {
        id
      }
    }
  }
}
```

## Using data from the source plugin in a site

- Install `gatsby-image`
- Add file `example-site/src/pages/index.js`

```js
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => (
  <>
    <h1>Posts</h1>
    <section
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat( auto-fit, minmax(250px, 1fr) )`,
        gridGap: 16,
      }}
    >
      {data.allPost.nodes.map(post => (
        <div
          style={{
            display: `flex`,
            flexDirection: `column`,
            padding: 16,
            border: `1px solid #ccc`,
          }}
        >
          <h2>{post.slug}</h2>
          <span>By: {post.author.name}</span>
          <p>{post.description}</p>
          <Img
            fluid={post.remoteImage.childImageSharp.fluid}
            alt={post.imgAlt}
          />
        </div>
      ))}
    </section>
  </>
)

export const query = graphql`
  {
    allPost {
      nodes {
        id
        slug
        description
        imgAlt
        author {
          id
          name
        }
        remoteImage {
          id
          childImageSharp {
            id
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
```

## Using plugin options to customize plugin usage

- In `gatsby-config.js`, add `options.preview` key for the `source-plugin`
- In `gatsby-node.js` `sourceNodes` API, the second positional argument is our options.
- This provides a way to have conditional logic for plugins

## Proactively updating data with subscriptions

### Touch nodes in `sourcesNode`

Use `getNodesByType` helper in `sourcesNodes` to get nodes of type `POST_NOTE_TYPE` and `AUTHOR_NOTE_TYPE`.
Then  use `actions.touchNode` on each of them to ensure they are not garbage collected.  `touchNode` takes in
an object with key `nodeId`

### Using pluginOptions.previewMode

Add a console.log placeholder with "Subscribing to content updates..."

## Publishing a plugin

npm docs: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry

gatsby plugin libary: https://www.gatsbyjs.org/plugins/

publish to gatsby library steps: https://www.gatsbyjs.org/contributing/submit-to-plugin-library/