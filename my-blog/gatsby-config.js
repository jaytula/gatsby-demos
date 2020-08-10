module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {
        preset: '@theme-ui/preset-funk',
        prismPreset: 'prism-okaidia'
      },
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `My Blog Title`,
    author: `My Name`,
    description: `My site description...`,
    siteUrl: 'https://codepasta.io',
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/gatsbyjs`,
      },
      {
        name: `github`,
        url: `https://github.com/gatsbyjs`,
      },
    ],
  },
}
