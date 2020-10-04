import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {data.allWpPost.edges.map(({ node }) => {
        const imageRes = node.featuredImage.node.localFile.childImageSharp.fixed
        return <Img fixed={imageRes} key={imageRes.src} />
      })}
      <div>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

// Documentation says to use fragment: ...GatsbyImageSharpFixed_withWebp_tracedSVG
// But we explicitly try the fields for clarity instead

export const query = graphql`
  query MyQuery {
    allWpPost {
      edges {
        node {
          id
          content
          date
          slug
          title
          featuredImageId
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  fixed(height: 200, width: 200) {
                    srcWebp
                    srcSetWebp
                    srcSet
                    src
                    width
                    tracedSVG
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
