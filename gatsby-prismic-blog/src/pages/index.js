import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/Layout"
import { graphql } from "gatsby"
import BlogPosts from "../components/blog-post"

const IndexPage = ({data}) => {
  const posts = data.allPrismicPost.edges;

  return (
  <Layout>
    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    <BlogPosts posts={posts} />
  </Layout>
)}

export const query = graphql`
query MyQuery {
  allPrismicPost {
    edges {
      node {
        id
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
}
`;

export default IndexPage;