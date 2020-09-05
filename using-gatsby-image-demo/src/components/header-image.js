import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const HeaderImage = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "strawberry-jam.jpg" }) {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  
  return <Img fixed={data.file.childImageSharp.fixed} />
}

export default HeaderImage