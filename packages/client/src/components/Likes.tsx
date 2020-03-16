import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { GET_POSTS } from './Posts'

const LIKE_POST = gql`
  mutation LikePost($post_id: String!) {
    likePost(post_id: $post_id)
  }
`;

const Wrapper = styled.div`
  background-color: rgb(102, 108, 158);
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  top: 0;
  right: 0;
  opacity: 0.8;
  transition: opacity .25s ease-in-out;
  -moz-transition: opacity .25s ease-in-out;
  -webkit-transition: opacity .25s ease-in-out;

  &:hover {
    opacity: 1;
  }
`

const WrapperNoLikes = styled(Wrapper)`
  opacity: 0.5;
`;

const Heart = styled.svg`
  width: 35px;
  fill: rgb(28, 33, 70);
`

const ActiveHeart = styled(Heart)`
  fill: rgb(255, 0, 130);
`

const NumberOfLikes = styled.div`
  color: rgb(255, 255, 255);
  font-size: 14px;
  position: absolute;
  right: 0;
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
      {likes > 1 && <NumberOfLikes>x{likes}</NumberOfLikes>}
    </Wrapper>
    )
  }

  return (
    <WrapperNoLikes onClick={onButtonClick}>
      <Heart xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"/>
      </Heart>
    </WrapperNoLikes>
  )
}

export default Likes

