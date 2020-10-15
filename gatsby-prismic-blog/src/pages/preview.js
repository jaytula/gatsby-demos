import * as React from "react"
import { withPreviewResolver } from "gatsby-source-prismic"

import { linkResolver } from "../linkResolver"

import Layout from "../components/layout"

const PreviewPage = props => {
  const { isPreview, data, isLoading } = props
  if (isPreview === false) return "Not a preview!"

  return (
    <Layout>
      <h1>Preview Page</h1>
      <p>
        TODO: This page then determines the previewed document's URL and redirects to
        that page while storing the preview data.
      </p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout>
  )
}

export default withPreviewResolver(PreviewPage, {
  repositoryName: process.env.GATSBY_PRISMIC_REPOSITORY_NAME,
})