# Making a Site with User Authentication

When you need to create a site with gated content.

Tutorial Link: https://www.gatsbyjs.com/tutorial/authentication-tutorial/

## Building your Gatsby app

```shell
gatsby new gatsby-auth gatsbyjs/gatsby-starter-hello-world
```

Create file `src/components/nav-bar.js`:

```jsx
import React from 'react'
import { Link } from 'gatsby';

const NavBar = () => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        borderBottom: '1px solid #d1c1e0'
      }}>
      <span>You are not logged in</span>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/">Profile</Link>
        <Link to="/">Logout</Link>
      </nav>
    </div>
  )
}
```

Create file `src/components/layout.js`:

```jsx
import React from 'react'

import NavBar from './nav-bar'

const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
);

export default Layout
```

Create file `src/pages/index.js`:

```jsx
import React from 'react'

import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <h1>Hello world !</h1>
    </Layout>
  )
}
```