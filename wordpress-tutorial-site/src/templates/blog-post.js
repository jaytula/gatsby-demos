import React from 'react'
import Layout from '../components/layout'

const BlogPost = ({data}) => {
  const post = data.allWpPost.edges[0].node;

  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.content}} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`

export default BlogPost;