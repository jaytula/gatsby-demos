import React from "react"
import { withPreview } from "gatsby-source-prismic"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

// TODO: how can this component respond to /doc/[id] instead of just /doc

const Doc = ({ data }) => {
  return (
    <Layout>
      <p>Doc component</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
export default withPreview(Doc)

export const query = graphql`
  query DocTemplate($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      data {
        title {
          text
        }
        body {
          text
        }
      }
    }
  }
`
