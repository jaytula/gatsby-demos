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
- Set environment variables `STRIPE_PUBLISH_KEY` and `STRIPE_SECRET_KEY`

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