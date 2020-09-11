import React, { useContext } from "react"

const isBrowser = () => typeof window !== "undefined"

const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

const handleLogin = ({ username, password }) => {
  if (username === "john" && password === "pass") {
    return setUser({
      username: "john",
      name: "Johnny",
      email: "johnny@example.org",
    })
  }
  return false
}

const logout = callback => {
  setUser({})
  callback()
}

const AuthContext = React.createContext({
  getUser,
  isLoggedIn,
  handleLogin,
  logout,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{getUser, isLoggedIn, handleLogin, logout}}>
    {children}
  </AuthContext.Provider>
)
