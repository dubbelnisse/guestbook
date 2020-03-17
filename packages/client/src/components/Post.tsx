import React from 'react'
import { Post as PostType } from '../types.d'
import styled from 'styled-components'
import Avatar from './Avatar'
import Likes from './Likes'
import DeletePost from './DeletePost'
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
`

const Message = styled.div`
  text-align: left;
`

const Name = styled.span`
  font-weight: bold;
  margin-right: 10px;
`

const Header = styled.div`
  margin-top: 10px;
`

const Time = styled.span`
  color: rgb(111, 119, 172);
`

const Text = styled.div`
  color: rgb(111, 119, 172);
  margin-top: 30px;
`

const CtaButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
  position: absolute;
  top: 30px;
  right: 30px;
`

interface PostProps {
  post: PostType
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Wrapper>
      <Avatar src={post.author_avatar} alt={post.author_name} />
      <Message>
        <Header>
          <Name>{post.author_name}</Name>
          <Time>{format(Number(post.created), 'iiii, do MMM y - h:m a')}</Time>
        </Header>
        <Text>{post.text}</Text>
      </Message>
      <CtaButtons>
        <DeletePost postId={post.id} githubId={post.author_id} />
        <Likes likes={post.likes} postId={post.id} />
      </CtaButtons>
    </Wrapper>
  )
}

export default Post

