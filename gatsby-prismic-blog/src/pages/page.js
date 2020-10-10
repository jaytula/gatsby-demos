// src/templates/page.js

import * as React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

// `data` will automatically include preview data when previewing from Prismic.
const PageTemplate = ({ data }) => (
  <div>
    <h1>{data.prismicPage.data.title.text}</h1>
  </div>
)

export default withPreview(PageTemplate)

export const query = graphql`
  query PageTemplate($uid: String!) {
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

// Where is the `$uid` coming from?