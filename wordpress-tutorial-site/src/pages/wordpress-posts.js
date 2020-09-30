import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const WordpressPosts = ({ data }) => (
  <Layout>
    <SEO title="Wordpress Posts" />
    <h1>Wordpress Posts</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    {data.allWpPost.edges.map(({ node }) => {
      return (
        <div key={node.id}>
          <h2>{node.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      )
    })}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
query MyQuery {
  allWpPost {
    edges {
      node {
        id
        excerpt
        slug
        title
      }
    }
  }
}

`

export default WordpressPosts
