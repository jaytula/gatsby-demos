# Multiple Themes Notes

## Create a new site

```shell
gatsby new multiple-themes https://github.com/gatsbyjs/gatsby-starter-hello-world
```

## Install and compose the themes

```shell
npm install gatsby-theme-blog gatsby-theme-notes
```

## Put blog posts on the hompeage

- remove `pages/index.js`
- Specify `options.basePath` as `/` for the `gatsby-theme-blog` plugin

## Shadow Theme UI

- `Theme-UI` docs: https://www.gatsbyjs.com/docs/theme-ui/
- Shadow at `src/gatsby-plugin/theme-ui/index.js