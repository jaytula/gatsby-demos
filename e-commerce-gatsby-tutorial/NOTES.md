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