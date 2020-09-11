import React, { Fragment } from "react"
import { Link, navigate } from "gatsby"
import { useAuth } from "../services/auth"

const NavBar = () => {
  const { isLoggedIn, logout, getUser }  = useAuth();

  const loggedIn = isLoggedIn()
  const user = getUser()

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      {loggedIn ? (
        <span>Welcome {user.name}!</span>
      ) : (
        <span>You are not logged in</span>
      )}
      <nav>
        <Link to="/">Home</Link>{" "}
        {loggedIn && (
          <Fragment>
            <Link to="/app/profile">Profile</Link>{" "}
            <a
              href="/"
              onClick={e => {
                e.preventDefault()
                logout(() => navigate("/app/login"))
              }}
            >
              Logout
            </a>
          </Fragment>
        )}
      </nav>
    </div>
  )
}

export default NavBar
