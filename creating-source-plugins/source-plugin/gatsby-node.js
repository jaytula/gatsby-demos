/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { split } = require("apollo-link");
const { HttpLink } = require("apollo-link-http");
const { WebSocketLink } = require("apollo-link-ws");
const { getMainDefinition } = require("apollo-utilities");
const fetch = require("node-fetch");
const gql = require("graphql-tag");
const WebSocket = require("ws");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin");

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Post`;
const AUTHOR_NODE_TYPE = "Author";

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    new WebSocketLink({
      uri: `ws://localhost:4000`, // or `ws://gatsby-source-plugin-api.glitch.me/`
      options: {
        reconnect: true,
      },
      webSocketImpl: WebSocket,
    }),
    new HttpLink({
      uri: "http://localhost:4000", // or `https://gatsby-source-plugin-api.glitch.me/`
      fetch,
    })
  ),
  cache: new InMemoryCache(),
});

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, getNodesByType },
  pluginOptions
) => {
  const { createNode, touchNode } = actions;
  console.log(pluginOptions);

  getNodesByType(POST_NODE_TYPE).forEach(node => {
    touchNode({ nodeId: node.id });
  });

  getNodesByType(AUTHOR_NODE_TYPE).forEach(node => {
    touchNode({ nodeId: node.id });
  });

  if (pluginOptions.previewMode) {
    console.log("Subscribing to content updates");

    const subscription = await client.subscribe(gql`
      subscription {
        posts {
          id
          slug
          description
          imgUrl
          imgAlt
          author {
            id
            name
          }
          status
        }
      }
    `);

    // TODO
  }

  const { data } = await client.query({
    query: gql`
      query {
        posts {
          id
          slug
          description
          imgUrl
          imgAlt
          author {
            id
            name
          }
          status
        }
        authors {
          id
          name
        }
      }
    `,
  });

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
  );

  data.authors.forEach(author =>
    createNode({
      ...author,
      id: createNodeId(`${AUTHOR_NODE_TYPE}-${author.id}`),
      parent: null,
      children: [],
      internal: {
        type: AUTHOR_NODE_TYPE,
        content: JSON.stringify(author),
        contentDigest: createContentDigest(author),
      },
    })
  );

  return;
};

exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === POST_NODE_TYPE) {
    console.log("onCreatefNode: " + node.id);
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.imgUrl,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    });

    if (fileNode) {
      node.remoteImage = fileNode.id;
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
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
    }`);
};
