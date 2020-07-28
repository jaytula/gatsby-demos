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

## 3. Creating Nested Layout Components - https://www.gatsbyjs.org/tutorial/part-three/
## 4. Data in Gatsby - https://www.gatsbyjs.org/tutorial/part-four/
## 5. Source Plugins - https://www.gatsbyjs.org/tutorial/part-five/
## 6. Transformer Plugins - https://www.gatsbyjs.org/tutorial/part-six/
## 7. Programatically create pages from data - https://www.gatsbyjs.org/tutorial/part-seven/
## 8. Preparing a Site to Go Live - https://www.gatsbyjs.org/tutorial/part-eight/
