import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Post from './Post'
import { Post as PostType } from '../types.d'

export const GET_POSTS = gql`
  {
    posts {
      id
      text
      author_name
      author_avatar
      created
      likes
    }
  }
`;

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {data.posts.map((post: PostType) => (
        <Post key={post.created} post={post} />
      ))}
    </div>
  )
}

export default Posts
