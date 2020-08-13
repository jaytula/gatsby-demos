/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Multiple Themes',
    menuLinks: [
      {
        name: 'Blog',
        url: '/'
      },
      {
        name: 'Notes',
        url: '/notes'
      }
    ]
  },
  plugins: [
    '@pauliescanlon/gatsby-mdx-embed',
    {
      resolve: 'gatsby-theme-blog',
      options: {
        basePath: '/'
      }
    },
    {
      resolve: 'gatsby-theme-notes',
      options: {
        basePath: '/notes'
      }
    },
  ],
}
