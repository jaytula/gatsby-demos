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

## Create data-driven pages using GraphQL and `createPages`

### Set up the call to create the root page

```js
// query for events and create pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const basePath = "/"
  actions.createPage({
    path: basePath,
    component: require.resolve("./src/templates/events.js"),
  })
}
```

- Default `basePath` to `"/"`
- Call `actions.createPage` to create the page at the `basePath`.
- Note the component `/src/templates/cevents.js` hasn't yet been created

### Query for events

```js
  const result = await graphql(`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic("error loading events", result.errors)
    return
  }
```

- Retrieve all events sorted by `startDate` in ascending order
- Handler error by checking for `results.errors`

### Create a page for each event

```js
  const events = result.data.allEvent.nodes
  events.forEach(event => {
    const slug = event.slug
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/event.js"),
      context: {
        eventID: event.id,
      },
    })
  })
```

- grab event nodes queried from GraphQL
- Loop through and use `createPage` to create a page for each event

### Create the `events` and `event` template components

#### Events template: `src/templates/events.js`

```jsx
import React from 'react';

const EventsTemplate = () => <p>TODO: Build the events page template</p>

export default EventsTemplate
```

#### Event template `src/templates/event.js`

```jsx
import React from 'react';

const EventTemplate = () => <p>TODO: Build the event page template</p>

export default EventTemplate
```

### Test that pages are building

```shell
yarn workspace gatsby-theme-events develop
```

## Display sorted data with `useStaticQuery`

In `gatsby-theme-events/src/templates/events.js`, import `graphql` and `useStaticQuery` from Gatsby.

It should look like this:

```js
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const EventsTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          name
          startDate
          endDate
          location
          url
          slug
        }
      }
    }
  `)
  const events = data.allEvent.nodes
  return <p>TODO: Build the events page template</p>
}

export default EventsTemplate
```

### Create UI to display event data

Start creating the UI to display event data:

```jsx
// General Layout
// gatsby-theme-events/src/components/layout.js

import React from 'react';

const Layout = ({ children }) => {
  <div>
    <h1>Gatsby Events Theme</h1>
    {children}
  </div>
}

export default Layout
```

```jsx
// events list component
// gatsby-theme-events/src/components/event-list.js

import React from 'react';

const EventList = ({events}) => <pre>{JSON.stringify(events, null, 2)}</pre>

export default EventList
```

### Add the layout and events list components to the events page

Update template file `events.js`:

- Import the two new components
- Return JSX of `EventsList` wrapped in `Layout`
- Test out that this is being displayed

### Update the event list component

Replace raw data with markup:

```jsx
import React from "react"
import { Link } from "gatsby"
const EventList = ({ events }) => (
  <>
    <h2>Upcoming Events</h2>
    <ul>
      {events.map(event => (
        <li key={event.id}>
          <strong>
            <Link to={event.slug}>{event.name}</Link>
          </strong>
          <br />
          {new Date(event.startDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          in {event.location}
        </li>
      ))}
    </ul>
  </>
)

export default EventList
```

## Display and query data by id with context and static queries

### Add a page query

Update `templates/event.js` to look like this:

```jsx
import React from "react"
import { graphql } from "gatsby"
export const query = graphql`
  query($eventID: String!) {
    event(id: { eq: $eventID }) {
      name
      url
      startDate(formatString: "MMMM DD YYYY")
      endDate(formatString: "MMMM DD YYYY")
      location
      slug
    }
  }
`

const EventTemplate = () => <p>TODO: Build the event page template</p>

export default EventTemplate
```

### Modify the event template to access event data

Update `templates/event.js` to look like this:

```jsx
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Event from "../components/event"

export const query = graphql`
  query($eventID: String!) {
    event(id: { eq: $eventID }) {
      name
      url
      startDate(formatString: "MMMM DD YYYY")
      endDate(formatString: "MMMM DD YYYY")
      location
      slug
    }
  }
`
const EventTemplate = ({ data: { event } }) => (
  <Layout>
    <Event {...event} />
  </Layout>
)

export default EventTemplate
```

- Note `Event` component doesn't yet exist.

So create it at `components/Event.js`:

```jsx
import React from "react"

const Event = props => <pre>{JSON.stringify(props, null, 2)}</pre>

export default Event
```

Finally update the `Event` component to use markup:

```jsx
import React from "react"

const Event = ({ name, location, url, startDate, endDate }) => (
  <div>
    <h2>
      {name} ({location})
    </h2>
    <p>
      {startDate}-{endDate}
    </p>
    <p>
      Website: <a href={url}>{url}</a>
    </p>
  </div>
)

export default Event
```

## Style and format dates in React

Update `compoenents/event.js` to look like this:

```jsx
import React from "react"

const getDate = (date, { day = true, month = true, year = true } = {}) =>
  date.toLocaleDateString("en-US", {
    day: day ? "numeric" : undefined,
    month: month ? "long" : undefined,
    year: year ? "numeric" : undefined,
  })
const EventDate = ({ startDate, endDate }) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const isOneDay = start.toDateString() === end.toDateString()
  return (
    <>
      <time dateTime={start.toISOString()}>
        {getDate(start, { year: isOneDay })}
      </time>
      {!isOneDay && (
        <>
          –
          <time dateTime={end.toISOString()}>
            {getDate(end, { month: start.getMonth() !== end.getMonth() })}
          </time>
        </>
      )}
    </>
  )
}

const Event = ({ name, location, url, startDate, endDate }) => (
  <div>
    <h2>
      {name} ({location})
    </h2>
    <p>
      <EventDate startDate={startDate} endDate={endDate} />
    </p>
    <p>
      Website: <a href={url}>{url}</a>
    </p>
  </div>
)

export default Event
```

## Configure a theme to take options

Update `gatsby-theme-events/gatsby-config.js` to:

```js
module.exports = ({ contentPath = "data", basePath = "/" }) => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPath,
      },
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Event",
      },
    },
  ],
})
```

Update `gatsby-theme-events/gatsby-node.js` to:

```js
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "data"

  // {...}
}

exports.sourceNodes = ({ actions }) => {
  // {...}
}

exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || "/"

  // {...}
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || "/"

  // {...}
}
```

- Convert `gatsby-config.js` to a function export that takes options: `contentPath` and `basePath`
- These options are provided as the second argument in Gatsby API hooks.
- Because the theme is now a function export, we can no longer run it standalone

### Set up `site/gatsby-config.js`

Create `gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-events",
      options: {
        contentPath: "events",
        basePath: "/events",
      },
    },
  ],
}
```

- Copy missing `events.yml` from theme plugin data folder