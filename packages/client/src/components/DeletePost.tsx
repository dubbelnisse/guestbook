import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { isLoggedIn, isSameUser } from '../helpers/auth'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { GET_POSTS } from './Posts'

const REMOVE_POST = gql`
  mutation RemovePost($post_id: String!) {
    removePost(post_id: $post_id)
  }
`

const Wrapper = styled.a`
  background-color: rgb(102, 108, 158);
  border-radius: 3px;
  cursor: pointer;
  color: rgb(28, 33, 70);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  opacity: 0.8;
  transition: opacity .25s ease-in-out, color .25s ease-in-out;
  -moz-transition: opacity .25s ease-in-out, color .25s ease-in-out;
  -webkit-transition: opacity .25s ease-in-out, color .25s ease-in-out;

  &:hover {
    color: rgb(255, 0, 130);
    opacity: 1;
  }
`

const Remove = styled.svg`
  width: 20px;
  fill: currentColor;
`

interface RemovePostProps {
  postId: string
  githubId: string
}

const DeletePost: React.FC<RemovePostProps> = ({ postId, githubId }) => {
  const [removePost] = useMutation(REMOVE_POST)

  const onButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    removePost({
      variables: {
        post_id: postId
      },
      refetchQueries: [{
        query: GET_POSTS,
      }]
    })
  }

  if (!isLoggedIn() || !isSameUser(githubId)) return null

  return (
    <Wrapper onClick={onButtonClick}>
      <Remove xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"/>
      </Remove>
    </Wrapper>
  )
}

export default DeletePost
