import React from "react"
import PropTypes from "prop-types"

const PRISMIC_TOOLBAR_SCRIPT = `
<script>
  window.prismic = {
    endpoint: 'https://gatsby-blog-scratch-demo.cdn.prismic.io/api/v2'
  };
</script>
<script type="text/javascript" src="https://static.cdn.prismic.io/prismic.min.js?new=true"></script>
`

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <div dangerouslySetInnerHTML={{ __html: PRISMIC_TOOLBAR_SCRIPT }} />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
