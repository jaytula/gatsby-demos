# Making an E-commerce Site with Stripe

https://www.gatsbyjs.com/tutorial/ecommerce-tutorial/

## Setting up a Gatsby site

```shell
gatsby new e-commerce-gatsby-tutorial
```

### Loading Stripe.js

Stripe provides a loading wrapper to load Stripe from Stripe's servers for
PCI compliance requirements

```js
import { loadStripe } from "@stripe/stripe-js"
let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("<YOUR STRIPE PUBLISHABLE KEY>")
  }
  return stripePromise
}
```

```shell
npm install @stripe/stripe-js
```

### Getting your Stripe keys

- Click `Developers` and then `API keys` in left side bar
- Set environment variables `GATSBY_STRIPE_PUBLISH_KEY` and `GATSBY_STRIPE_SECRET_KEY` in `.env.development`

### Enabling the "Checkout client-only integration" for your Stripe account

- Click `Settings` and then `Checkout settings` under `Product Settings` `Payments`

**Allow Checkout to read product information**

```
To use Checkout's client-only integration, you allow your publishable key to generate checkout
pages with a Product, SKU or Price ID on your Stripe account.

This means you can add one-time purchase and recurring products to Stripe via the Dashboard
and receive payments for them right away. Archived products cannot be purchased. However, users
with knowledge of a public product ID may be able to purchase the product.

If you don't want to make your product IDs public, or dynamically populate a checkout page without
using products on Stripe, integrate using the Checkout client & server integration.
```

## Example 1: One Button

### Create products and prices

This must be done from the Stripe Dashboard or via the Stripe API

### Create a checkout component that loads Stripe.js and redirects to the checkout

Component notes:

- Named import `loadStripe` from `@stripe/stripe-js`
- `loadStripe` is called with the Stripe Publish key
- Create an `onClick` handler called `redirectToCheckout`
- Create `getStripe` function so that `loadStripe` is called only once.
- Get `stripe` instance with `await getStripe()`
- We await on `stripe.redirectToChekcout` in `redirectToCheckout`. It takes an options object with
  - mode: "payment"
  - lineItems: `[{ price: string, quantity: number}]`
  - successUrl: 'http://something.com/success-location'
  - cancelUrl: 'http://something.com/cancel-location'
- Destructure `error` from `awaited` call to `stripe.redirectToCheckout` and display it

## Example 2: Import products and prices via a source plugin

### Add the Stripe source plugin

Instead of hardcoding price IDs, we can use `gatsby-source-stripe` plugin

```shell
npm install gatsby-source-stripe
```

Then add to `gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-stripe",
      options: {
        objects: ["Price"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
  ],
}
```

To use the defined env variable, in `gatsby-config.js`:

```js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

### Create a component that lists your products and prices

- Create component Products
- Use `useStaticQuery` or `StaticQuery`
- Construct `graphql` query from graphiql

### Extract loading of Stripe.js into a utility function

**src/utils/stripejs.js**

```js
/**
 * This is a singleton to ensure we only instantiate Stripe once
 */
import { loadStripe } from '@stripe/stripe-js'

let stripePromise
const getStripe = () => {
  if(!stripePromise) {
    stripePromie = loadStripe(process.env.GATSBY_STRIPE_PUBLISH_KEY)
  }
  return stripePromise
}
```

## Adding shopping cart functionality

There's a `use-shopping-cart` library