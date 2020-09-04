import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import './sourced-from-yaml.css'

const SourcedFromYaml = ({ data }) => {
  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <div>
        {data.allSpeakingYaml.edges.map(({ node }) => (
          <Img key={node.conference} className="selfie" fluid={node.image.childImageSharp.fluid} alt={node.conference} />
        ))}
      </div>
    </Layout>
  )
}

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
          conference
        }
      }
    }
  }
`

export default SourcedFromYaml
