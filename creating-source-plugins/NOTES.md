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