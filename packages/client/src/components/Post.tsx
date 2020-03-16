import React from 'react'
import { Post as PostType } from '../types.d'
import styled from 'styled-components'
import Avatar from './Avatar'
import Likes from './Likes'
import { format } from 'date-fns'

const Wrapper = styled.div`
  background-color: rgb(28, 33, 70);
  border-radius: 30px;
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-column-gap: 30px;
  padding: 30px;
  margin-top: 40px;
  position: relative;
`;

const Message = styled.div`
  text-align: left;
`;

const Name = styled.span`
  font-weight: bold;
  margin-right: 10px;
`

const Time = styled.span`
  color: rgb(111, 119, 172);
`

const Text = styled.div`
  color: rgb(111, 119, 172);
  margin-top: 15px;
`

interface PostProps {
  post: PostType
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Wrapper>
      <Avatar src={post.author_avatar} alt={post.author_name} />
      <Message>
        <div>
          <Name>{post.author_name}</Name>
          <Time>{format(Number(post.created), 'iiii, do MMM y - h:m a')}</Time>
        </div>
        <Text>{post.text}</Text>
      </Message>
      <Likes likes={post.likes} postId={post.id} />
    </Wrapper>
  )
}

export default Post

