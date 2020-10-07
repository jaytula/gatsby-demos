import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const IndexPage = ({data}) => (
  <Layout>
    <h1>Home Page</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </Layout>
)

export const query = graphql`
query MyQuery {
  allPrismicPost {
    edges {
      node {
        data {
          body {
            html
            text
          }
          title {
            html
            text
          }
        }
      }
    }
  }
}
`;

export default IndexPage;