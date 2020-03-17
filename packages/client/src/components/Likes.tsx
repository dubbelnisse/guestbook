import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_POSTS } from './Posts'

const LIKE_POST = gql`
  mutation LikePost($post_id: String!) {
    likePost(post_id: $post_id)
  }
`

const Wrapper = styled.div`
  background-color: rgb(102, 108, 158);
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  opacity: 0.8;
  transition: opacity .25s ease-in-out;
  -moz-transition: opacity .25s ease-in-out;
  -webkit-transition: opacity .25s ease-in-out;

  &:hover {
    opacity: 1;
  }
`

const Heart = styled.svg`
  width: 20px;
  fill: rgb(28, 33, 70);
`

const ActiveHeart = styled(Heart)`
  fill: rgb(255, 0, 130);
`

const Content = styled.div`
  color: rgb(255, 255, 255);
  font-size: 14px;
  margin-left: 10px;
`

interface LikesProps {
  likes?: number | null
  postId: string
}

const Likes: React.FC<LikesProps> = ({ likes, postId }) => {
  const [likePost] = useMutation(LIKE_POST)

  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault()
    likePost({
      variables: {
        post_id: postId
      },
      refetchQueries: [{
        query: GET_POSTS,
      }]
    })
  }

  if (likes) {
    return (
    <Wrapper onClick={onButtonClick}>
      <ActiveHeart xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"/>
      </ActiveHeart>
      {likes > 1 && <Content>{likes}</Content>}
    </Wrapper>
    )
  }

  return (
    <Wrapper onClick={onButtonClick}>
      <Heart xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"/>
      </Heart>
      <Content>Like</Content>
    </Wrapper>
  )
}

export default Likes

