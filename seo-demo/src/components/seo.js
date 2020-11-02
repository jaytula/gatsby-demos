import React from "react"
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang, meta, image: metaImage, title }) => {
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

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  })
}

export default SEO
