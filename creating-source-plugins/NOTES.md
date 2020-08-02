# Notes

URL: https://www.gatsbyjs.org/tutorial/source-plugin-tutorial/

## Set up projects for plugin development

### Set up an example site

```shell
gatsby new example-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

### Set up a source plugin

```shell
gatsby new source-plugin https://github.com/gatsbyjs/gatsby-starter-plugin
```

### Install your plugin in the example site

Add `source-plugin` to `plugins` array in `gatsby-config.js`

```js
module.exports = {
  plugins: [require.resolve(`../source-plugin`)],
}
```

Run `gatsby develop` and note that when starting up there is:

```shell
Loading gatsby-starter-plugin
```

Which is from the export `onPreInit` from `gatsby-node.js`.