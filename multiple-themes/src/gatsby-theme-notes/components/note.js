import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "gatsby-theme-notes/src/components/layout"
import Navigation from "../../components/navigation"

const WikiPage = ({
  data: {
    note: { body },
    site: {
      siteMetadata: { title },
    },
  },
  ...props
}) => (
  <Layout {...props} title={title}>
    <Navigation />
    <MDXRenderer>{body}</MDXRenderer>
  </Layout>
)

export default WikiPage
