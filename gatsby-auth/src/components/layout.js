import React from "react"

import NavBar from "./nav-bar"
import { AuthProvider } from "../services/auth"

const Layout = ({ children }) => (
  <>
    <AuthProvider>
      <NavBar />
      {children}
    </AuthProvider>
  </>
)

export default Layout
