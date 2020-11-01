import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description }) => {
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

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        { name: "description", content: site.siteMetadata.description },
        {
          name: "keywords",
          content: site.siteMetadata.keywords.join(","),
        },
      ]}
    />
  )
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  description: "",
}

export default SEO
