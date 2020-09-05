import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { graphql } from "gatsby"

const MultipleQueriesDemo = ({ data }) => {
  return (
    <Layout>
      <h1>Multiple Queries Demo</h1>
      <h2>allSpeakingYaml</h2>

      {data.allSpeakingYaml.edges.map(({ node }) => (
        <Img
          key={node.image.childImageSharp.fluid.src}
          fluid={node.image.childImageSharp.fluid}
          alt=""
        />
      ))}
      <h2>banner</h2>

      <Img fluid={data.banner.childImageSharp.fluid} alt="" />

      <h2>JSON</h2>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

export default MultipleQueriesDemo

export const query = graphql`
  {
    allSpeakingYaml {
      edges {
        node {
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    banner: file(relativePath: { eq: "strawberry-jam.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
