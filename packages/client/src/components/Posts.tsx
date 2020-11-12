import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Post from './Post'
import NoPosts from './NoPosts'
import { Post as PostType } from '../types.d'

export const GET_POSTS = gql`
  {
    posts {
      id
      text
      author_id
      author_name
      author_avatar
      created
      likes
    }
  }
`;

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)
  console.log('GET POSTS')
  console.log(error)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data.posts.length === 0) return <NoPosts />

  return (
    <div>
      {data.posts.map((post: PostType) => (
        <Post key={post.created} post={post} />
      ))}
    </div>
  )
}

export default Posts
