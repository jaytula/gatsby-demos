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
        <Link to="/">Home</Link>{' '}
        <Link to="/app/profile">Profile</Link>{' '}
        <Link to="/app/login">Logout</Link>
      </nav>
    </div>
  )
}

export default NavBar
