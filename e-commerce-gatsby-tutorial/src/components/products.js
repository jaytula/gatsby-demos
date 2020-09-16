import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
{
  allStripePrice(filter: {active: {eq: true}}, sort: {fields: unit_amount}) {
    edges {
      node {
        id
        product {
          name
          id
        }
        currency
        active
        unit_amount
      }
    }
  }
}

`

const Products = () => {
  const data = useStaticQuery(query)
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data.allStripePrice.edges.map(({ node }) => (
        <p key={node.id}>{node.product.name}</p>
      ))}
    </div>
  )
}

export default Products
