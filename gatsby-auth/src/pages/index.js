import React, { Fragment } from "react"

import Layout from "../components/layout"
import { useAuth } from "../services/auth"
import { Link } from "gatsby"

export default function Home() {
  const { isLoggedIn, getUser } = useAuth()

  const loggedIn = isLoggedIn()
  const user = getUser()

  return (
    <Layout>
      <h1>Hello {loggedIn ? user.name : "world"} !</h1>

      <p>
        {loggedIn ? (
          <Fragment>
            You are logged in! Check your <Link to="/app/profile">profile</Link>
            .
          </Fragment>
        ) : (
          <Fragment>
            You are not logged in. Log in <Link to="/app/login">here</Link>
          </Fragment>
        )}
      </p>
    </Layout>
  )
}
