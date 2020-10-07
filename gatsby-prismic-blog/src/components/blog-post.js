import { RichText } from 'prismic-reactjs';
import React from 'react';

const BlogPosts = ({ posts }) => {
  if (!posts) return null
  return (
    <div>
      {posts.map(post => {
        console.log(post);
        return (
          <div key={post.node.id}>
            <RichText render={post.node.data.title.raw} />
            <RichText render={post.node.data.body.raw} />
          </div>
        )
      })}
    </div>
  )
}

export default BlogPosts;