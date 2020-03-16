import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './routes/App'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { parse } from 'query-string'

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_BASE_URI}/graphql`,
  request: (operation) => {
    const token = localStorage.getItem('token')

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

const setLogin = (bearer: any) => {
  localStorage.setItem('token', bearer)
}

const RootApp = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/auth/github/callback" render={(props) => {
          const { access_token } = parse(props.location.search)
          setLogin(access_token)
          return <Redirect to="/" />
        }}/>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<RootApp />, document.getElementById('root'))
