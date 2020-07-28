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

## 3. Creating Nested Layout Components - https://www.gatsbyjs.org/tutorial/part-three/
## 4. Data in Gatsby - https://www.gatsbyjs.org/tutorial/part-four/
## 5. Source Plugins - https://www.gatsbyjs.org/tutorial/part-five/
## 6. Transformer Plugins - https://www.gatsbyjs.org/tutorial/part-six/
## 7. Programatically create pages from data - https://www.gatsbyjs.org/tutorial/part-seven/
## 8. Preparing a Site to Go Live - https://www.gatsbyjs.org/tutorial/part-eight/
