import React, { MouseEvent, ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_POSTS } from './Posts'

const ADD_POST = gql`
  mutation AddPost($input: PostInput!) {
    addPost(input: $input) {
      id
    }
  }
`

const Wrapper = styled.div`
  background-color: rgb(41, 48, 89);
  border-radius: 30px;
  padding: 30px;
  margin: 20px 0 40px 0;
`

const H1 = styled.h1`
  font-size: 30px;
  margin-top: 0;
`

const Textarea = styled.textarea`
  background-color:  rgb(21, 26, 57);
  color: rgb(255, 255, 255);
  padding: 20px;
  width: calc(100% - 40px);
`

const Button = styled.button`
  background-color: rgb(255, 0, 130);
  color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 15px 20px;
  margin-top: 15px;
  opacity: 0.8;
  transition: opacity .25s ease-in-out;
  -moz-transition: opacity .25s ease-in-out;
  -webkit-transition: opacity .25s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`

const WritePost: React.FC = () => {
  const [text, setText] = useState('')
  const [addPost] = useMutation(ADD_POST)

  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault()
    addPost({
      variables: {
        input: {
          text
        }
      },
      refetchQueries: [{
        query: GET_POSTS,
      }]
    })
    setText('')
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <Wrapper>
      <H1>Make your contribution here!</H1>
      <Textarea value={text} onChange={handleInputChange} placeholder="write something here..." rows={5}></Textarea>
      <Button onClick={onButtonClick}>POST</Button>
    </Wrapper>
  )
}

export default WritePost

