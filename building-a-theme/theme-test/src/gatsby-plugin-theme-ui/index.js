import merge from "lodash.merge"
import { theme } from "@groundearth0/gatsby-theme-events"

// Bug... theme is undefined
console.log({theme});

export default merge({}, theme, {
  colors: {
    primary: 'green'
  }
})