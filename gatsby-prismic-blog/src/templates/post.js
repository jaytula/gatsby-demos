import React from "react"

const Post = props => {
  return (
    <div>
      <h1>A Post</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default Post