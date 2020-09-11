import React from "react"
import { useAuth } from "../services/auth"

const Profile = () => {
  const { getUser } = useAuth();
  const user = getUser()

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.username}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </>
  )
}

export default Profile
