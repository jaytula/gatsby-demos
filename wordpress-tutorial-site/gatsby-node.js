/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({graphql}) => {
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
`);

 console.log(JSON.stringify(result, null, 2));
 return result;
}