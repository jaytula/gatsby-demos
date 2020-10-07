import { RichText } from 'prismic-reactjs';
import React from 'react';

const BlogPosts = ({ posts }) => {
  if (!posts) return null
  return (
    <div>
      {posts.map(post => {
        return (
          <div key={post.node._meta.id}>
            <h2>{RichText.asText(post.node.title)}</h2>
            <p>
              <time>{post.node.date}</time>
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default BlogPosts;