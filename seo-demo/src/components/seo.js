import React from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description}) => {
  const { site } = useStaticQuery(
    grqphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return null;
}

export default SEO