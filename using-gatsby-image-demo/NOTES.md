# NOTES

https://www.gatsbyjs.com/tutorial/gatsby-image-tutorial/

## Step 1

```shell
npm install gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

## Step 2

**gatsby-config.js**

```js
module.exports = {
  plugins: ["gatsby-transformer-sharp", "gatsby-plugin-sharp"]
}
```

## Step 3

```shell
npm install gatsby-source-filesystem
```

**gatsby-config.js**

```js
module.exports = {
  plugins: [
    "gatsby-transformer-sharp", 
    "gatsby-plugin-sharp"
    {
      resolve: 'gatsby-source-filesystem', options: { path: './src/data/' }
    }
  ]
}
```