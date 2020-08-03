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