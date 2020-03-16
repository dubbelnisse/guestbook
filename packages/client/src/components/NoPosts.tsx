import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: rgb(28, 33, 70);
  border-radius: 30px;
  padding: 30px;
  margin: 20px 0 40px 0;
  text-align: center;
  font-size: 20px;
`

const NoPosts: React.FC = () => {
  return (
    <Wrapper>No posts. Login and start writing!</Wrapper>
  )
}

export default NoPosts
