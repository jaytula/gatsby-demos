import React from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Img
        className="headshot"
        fixed={data.file.childImageSharp.fixed}
        alt=""
      />
    </Layout>
  )
}

export const query = graphql`
query {
  file(relativePath: { eq: "headers/headshot.jpg" }) {
    childImageSharp {
      fixed(width: 125, height: 125) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}
`
export default HomePage;