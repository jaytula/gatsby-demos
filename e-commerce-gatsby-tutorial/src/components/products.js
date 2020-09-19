import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductCard from "./Products/ProductCard"

const query = graphql`
  {
    allStripePrice(
      filter: { active: { eq: true } }
      sort: { fields: unit_amount }
    ) {
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

  const products = {}
  for (const { node } of data.allStripePrice.edges) {
    const product = node.product
    if (!products[product.id]) {
      products[product.id] = product
      products[product.id].prices = []
    }
    products[product.id].prices.push(node)
  }
  return (
    <div>
      {/* <pre>{JSON.stringify(data.allStripePrice.edges, null, 2)}</pre> */}
      {Object.keys(products).map(key => (
        <ProductCard key={products[key].id} product={products[key]} />
      ))}
    </div>
  )
}

export default Products
