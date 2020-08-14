# Building a Theme Notes

**Tutorial Links**

- https://www.gatsbyjs.com/tutorial/building-a-theme/
- https://egghead.io/courses/gatsby-theme-authoring

## Set up yarn workspaces

We'll be create two workspaces `gatsby-theme-events` and `site`.

##  Add a `package.json`

Specify `workspaces` array in `package.json`

## Set up `gatsby-theme-events` and `site`

- Create folders: `gatsby-theme-events` and `site`.
- Create `package.json` in each of these folders

```json
{
  "name": "gatsby-theme-events",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "gatsby build",
    "clean": "gatsby clean",
    "develop": "gatsby develop"
  }
}
```

```json
{
  "private": true,
  "name": "site",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "clean": "gatsby clean"
  }
}
```

- Create a blank `index.js` in `gatsby-theme-events` project folder