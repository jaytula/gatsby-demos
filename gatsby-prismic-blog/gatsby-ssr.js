import * as React from "react"
import { PreviewStoreProvider } from "gatsby-source-prismic"

export const wrapRootElement = ({ element }) => {
  return <PreviewStoreProvider>{element}</PreviewStoreProvider>
}
