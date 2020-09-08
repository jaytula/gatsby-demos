# Making a Site with User Authentication

When you need to create a site with gated content.

Tutorial Link: https://www.gatsbyjs.com/tutorial/authentication-tutorial/

## Building your Gatsby app

```shell
gatsby new gatsby-auth gatsbyjs/gatsby-starter-hello-world
```

Create file `src/components/nav-bar.js`:

```jsx
import React from "react"
import { Link } from "gatsby"

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
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
import React from "react"

import NavBar from "./nav-bar"

const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)

export default Layout
```

Create file `src/pages/index.js`:

```jsx
import React from "react"

import Layout from "../components/layout"

export default function Home() {
  return (
    <Layout>
      <h1>Hello world !</h1>
    </Layout>
  )
}
```

## Authentication service

Create file `src/services/auth.js`:

```js
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  if (username === "john" && password === "pass") {
    return setUser({
      username: "john",
      name: "Johnny",
      email: "johnny@example.org",
    })
  }
  return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}
```

## Creating client-only routes

1. Create `gatsby-node.js`:

```js
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages only on the client
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
  }

  // Update the page
  createPage(page)
}
```

2. Then create `src/pages/app.js`:

```jsx
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      <Profile path="/app/profile" />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
```

3. Create `src/components/profile.js`

```jsx
import React from "react"

const Profile = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: Your name will appear here</li>
      <li>E-mail: And here goes the mail</li>
    </ul>
  </>
)

export default Profile
```

4. create `src/components/login.js`

```jsx
import React, { useState } from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

const Login = () => {
  const [formInputs, setFormInputs] = useState({ username: "", password: "" })

  const handleUpdate = event => {
    setFormInputs({...formInputs, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault();
    handleLogin(formInputs);
  }

  if(isLoggedIn()) {
    navigate('/app/profile')
  }

  return (
     <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            handleSubmit(event)
            navigate(`/app/profile`)
          }}
        >
          <label>
            Username
            <input type="text" name="username" onChange={handleUpdate} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
  )
}

export default Login
```
