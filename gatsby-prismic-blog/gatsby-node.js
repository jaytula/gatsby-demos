/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = async({graphql, actions}) => {
  const { createPage } = actions;

  const pages = await graphql(`
  query MyQuery {
    allPrismicPost {
      nodes {
        id
        uid
        data {
          body {
            html
            raw
            text
          }
          title {
            html
            raw
            text
          }
        }
      }
    }
  }
  `);

  pages.data.allPrismicPost.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/post.js'),
      context: {
        id: node.id,
        uid: node.uid
      }
    })

        createPage({
      path: `/preview/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/preview.js'),
      context: {
        id: node.id,
        uid: node.uid
      }
    })
  })
}