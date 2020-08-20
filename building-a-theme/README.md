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

## Add dependencies to `site`

```shell
yarn workspace site add gatsby react react-dom gatsby-theme-events@*
```

- Check dependencies with `yarn workspaces info`

## Add peer dependencies to `gatsby-theme-events`

```shell
yarn workspace gatsby-theme-events add -P gatsby react react-dom
```

## Add development dependencies to `gatsby-theme-events`

```shell
yarn workspace gatsby-theme-vents add -D gatsby react react-dom
```

## Run `site` and `gatsby-theme-events`

```shell
yarn workspace site develop
```

```shell
yarn workspace gatsby-theme-events develop
```

**Important**

For each workspace, add `.eslintrc`:

```
{
  "plugins": [
    "jsx-a11y"
  ]
}
```

## Add static data to a theme

- Create a file `gatsby-theme-events/data/events.yml` for sample data:

```yaml
- name: React Rally
  location: Salt Lake City, UT
  start_date: 2019-08-22
  end_date: 2019-08-23
  url: https://www.reactrally.com/

- name: DinosaurJS
  location: Denver, CO
  start_date: 2019-06-20
  end_date: 2019-06-21
  url: https://dinosaurjs.org/

- name: JSHeroes
  location: Cluj-Napoca, Romania
  start_date: 2020-04-23
  end_date: 2020-04-24
  url: https://jsheroes.io/

- name: The Lead Developer
  location: Austin, TX
  start_date: 2019-11-08
  end_date: 2019-11-08
  url: https://austin2019.theleaddeveloper.com/
```

- Install dependencies to be able to read YAML: `yarn workspace gatsby-theme-events add gatsby-source-filesystem gatsby-transformer-yaml`

- Create `gatsby-config.js` in `gatsby-theme-events`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "data",
      },
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Event",
      },
    },
  ],
}
```

- Restart the dev server: `yarn workspace gatsby-theme-events develop`

- Try the following GraphQL query:

```
query MyQuery {
  allEvent {
    edges {
      node {
        name
      }
    }
  }
}
```

## Create a data directory using the `onPreBootstrap` lifecycle

In `gatsby-theme-events` create `gatsby-node.js`:

```js
const fs = require("fs")

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "data"

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}
```

## Set up to create data-driven pages

### Define the `Event` Type

This is done `exports.sourceNodes` of `gatsby-node.js`

- Use the `createTypes` to create the new `Event` type
- The `Event` type will implemnt the Gatsby `Node` interface
- Use `@dontInfer` because we will be defining the fields directly
- Specify `id` and other fields
- We also have a `slug` which we'll define in the next step.

```js
// Define the "Event" type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `)
}
```

### Define resolvers for any custom fields (slug)

Add createResolvers API hook:

```js
// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }) => {
  const basePath = "/"
  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/")
  }
  createResolvers({
    Event: {
      slug: {
        resolve: source => slugify(source.name),
      },
    },
  })
}
```