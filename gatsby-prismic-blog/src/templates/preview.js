// src/templates/page.js

import * as React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'
import { RichText } from 'prismic-reactjs'

// `data` will automatically include preview data when previewing from Prismic.
const PageTemplate = ({ data }) => (
  <div>
    <h1>{data.prismicPost.data.title.text}</h1>
    <div>
      <RichText render={data.prismicPost.data.body.raw} />
    </div>
  </div>
)

export default withPreview(PageTemplate)

export const query = graphql`
  query PageTemplate($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      data {
        title {
          html
          raw
          text
        }
        body {
          html
          raw
          text
        }
      }
    }
  }
`

// Where is the `$uid` coming from?