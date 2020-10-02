/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query MyQuery {
      allWpPost {
        edges {
          node {
            id
            excerpt
            content
            date
            slug
            title
          }
        }
      }
    }
  `)

  console.log(JSON.stringify(result, null, 2))

  result.data.allWpPost.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.slug
      }
    })
  })
}
