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

## Add another theme

```shell
npm install @pauliescalon/gatsby-mdx-embed
```

- Add to plugins array in `gatsby-config.js`

- Add test post with `<Youtube youTubeId="abcdefg" />` under `content/posts/something.md`

## Add a navigation menu

1. Add `menuLinks` array to `gatsby-config.js` under the `siteMetadata` key.  This is of type
`{name: string, url: string}[]`
2. Create nativation component at `src/components/navigation.js`
3. Shadow `gatsby-theme-blog/components/header.js`
4. Import and add Navigation component

