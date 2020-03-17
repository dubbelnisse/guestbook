import React from 'react'
import Posts from '../components/Posts'
import styled from 'styled-components'
import WritePost from '../components/WritePost'
import Login from '../components/Login'
import { isLoggedIn } from '../helpers/auth'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr minmax(auto, 960px) 1fr 20px;
`

const Content = styled.div`
  grid-column: 3/4;
`

function App() {
  return (
    <Wrapper>
      <Content>
        {isLoggedIn() ? <WritePost /> : <Login />}
        <Posts />
      </Content>
    </Wrapper>
  )
}

export default App

