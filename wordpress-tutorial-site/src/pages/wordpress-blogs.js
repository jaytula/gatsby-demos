import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const WordpressBlogsPage = ({ data }) => (
  <Layout>
    <SEO title="Wordpress Blogs" />
    <h1>Wordpress Blogs</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    {data.allWpPage.edges.map(({ node }) => {
      return (
        <div key={node.id}>
          <h2>{node.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: node.content }} />
        </div>
      )
    })}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
  query MyQuery {
    allWpPage {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`

export default WordpressBlogsPage
