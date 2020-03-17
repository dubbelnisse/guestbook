import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './routes/App'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { parse } from 'query-string'
import LoginRedirect from './routes/LoginRedirect'

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

const RootApp = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/auth/github/callback" render={(props) => {
          const { access_token } = parse(props.location.search)
          return <LoginRedirect token={access_token} />
        }}/>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<RootApp />, document.getElementById('root'))
