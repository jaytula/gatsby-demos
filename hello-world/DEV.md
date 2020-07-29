# Gatsby Tutorial Notes

## 0. Set Up Your Development Environment - https://www.gatsbyjs.org/tutorial/part-zero/
## 1. Get to Know Gatsby Building Blocks - https://www.gatsbyjs.org/tutorial/part-one/

### Using Gatsby starters

```shell
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

The command structure is:

```shell
gatsby new [FOLDER_NAME] [URL_OF_STARTER_GITHUB_REPO]
```

## 2. Introduction to Styling in Gatsby - https://www.gatsbyjs.org/tutorial/part-two/

### Using global styles

- Create `src/styles` folder
- Create `global.css` in that folder
- Define a style for testing `html { background-color: lavender-blush; }`
- Create file `gatsby-browser.js` at project root (not under `src` but beside it)
- Import the `global.css` in this file
- Restart `gatsby develop` because `gatsby-browsers.js` changed

### Using component-scope CSS

- In `src/components` create `container.ts` and `container.module.css`
- Style `.container` with `margin: 3rem auto; max-width: 600px`
- `Container` simply is a div-wrap
- Create new file `about-css-modules.js` in `src/pages`

```js
import React from "react"
import styles from "./about-css-modules.module.css"
import Container from "../components/container"

console.log(styles)

const User = props => (
  <div className={styles.user}>
    <img src={props.avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)

export default function About() {
  return (
    <Container>
      <h1>About CSS Modules</h1>
      <p>CSS Modules are cool</p>
      <User
        username="Jane Doe"
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
        excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
      <User
        username="Bob Smith"
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
        excerpt="I'm Bob Smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
    </Container>
  )
}
```

- Create alongside `about-css-modules.module.css`

```css
.user {
  display: flex;
  align-items: center;
  margin: 0 auto 12px auto;
}

.user:last-child {
  margin-bottom: 0;
}

.avatar {
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  margin: 0;
}

.description {
  flex: 1;
  margin-left: 18px;
  padding: 12px;
}

.username {
  margin: 0 0 12px 0;
  padding: 0;
}

.excerpt {
  margin: 0;
}
```

### CSS-in-JS

There are many different CSS-in-JS libraries many of which have Gatsby plugins.  Some notable ones:

- Emotion
- Styled Components

## 3. Creating Nested Layout Components - https://www.gatsbyjs.org/tutorial/part-three/

- `npm i gatsby-plugin-typography react-typography typography typography-theme-fairy-gates`
- Edit `gatsby-config.js` to include `gatsby-plugin-typography`

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

- Add `src/utils/typography.js` with the following contents:

```js
import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
```

- Add `./pages/typography-demo.js` with the following:

```js
import React from "react"
export default function TypographyDemo() {
  return (
    <div>
      <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
      <p>
        What do I like to do? Lots of course but definitely enjoy building
        websites.
      </p>
    </div>
  )
}
```

### Creating layout components

- Add `src/pages/about.js`

```js
import React from "react"

export default function About() {
  return (
    <div>
      <h1>About me</h1>
      <p>
        I’m good enough, I’m smart enough, and gosh darn it, people like me!
      </p>
    </div>
  )
}
```

- Add `src/pages/contact.js`

```js
import React from "react"

export default function Contact() {
  return (
    <div>
      <h1>I'd love to talk! Email me at the address below</h1>
      <p>
        <a href="mailto:me@example.com">me@example.com</a>
      </p>
    </div>
  )
}
```

- Create `src/components/layout.js`

```js
import React from "react"

export default function Layout({ children }) {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      {children}
    </div>
  )
}
```

- Update `src/pages/index.js` to

```js
import React from "react"
import Layout from "../components/layout"

export default function Home() {
  return (
    <Layout>
      <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
      <p>
        What do I like to do? Lots of course but definitely enjoy building
        websites.
      </p>
    </Layout>
  );
}
```

- Wrap `about.js` and `contact.js` like `index.js`
- Add `h3` with textContent `MySweetSite`
- Update `layout.js` to

```js
import React from "react"
import { Link } from "gatsby"
const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default function Layout({ children }) {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      <header style={{ marginBottom: `1.5rem` }}>
        <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
          <h3 style={{ display: `inline` }}>MySweetSite</h3>
        </Link>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/">About</ListLink>
          <ListLink to="/contact/">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
```


## 4. Data in Gatsby - https://www.gatsbyjs.org/tutorial/part-four/
## 5. Source Plugins - https://www.gatsbyjs.org/tutorial/part-five/
## 6. Transformer Plugins - https://www.gatsbyjs.org/tutorial/part-six/
## 7. Programatically create pages from data - https://www.gatsbyjs.org/tutorial/part-seven/
## 8. Preparing a Site to Go Live - https://www.gatsbyjs.org/tutorial/part-eight/
