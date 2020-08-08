import React from "react"
import { graphql } from "gatsby"

export default ({data}) => {
  const {markdownRemark} = data;

  return (
    <div>
      <div>Hello Blog World!</div>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={({__html: markdownRemark.html})} />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
