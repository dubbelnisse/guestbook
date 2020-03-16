import express from 'express'
import { ApolloServer, gql, PubSub, IResolvers } from 'apollo-server-express'
import {
  typeDefs as guestbookDefs,
  resolvers as guestbookResolvers,
} from './resolvers/guestbook'
import {
  typeDefs as userDefs,
  resolvers as userResolvers,
} from './resolvers/user'
import merge from 'lodash.merge'
import http from 'http'
import { AuthDirective } from 'graphql-directive-auth'
import { authenticateFunc } from './helpers/auth'
import config from './config'
import { db } from './adapters/postgres'
import { authorize, oauth } from './helpers/auth'

process.env.APP_SECRET = config.auth.secret

const customAuth = AuthDirective({
  authenticateFunc,
})

export const pubsub = new PubSub()

const typeDefs = gql`
  """
  Directives
  """
  directive @isAuthenticated on FIELD | FIELD_DEFINITION

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

const server = new ApolloServer({
  typeDefs: [typeDefs, guestbookDefs, userDefs],
  resolvers: merge(guestbookResolvers, userResolvers) as IResolvers,
  schemaDirectives: {
    ...customAuth,
  },
  context: ({ req }) => ({
    db,
    req,
  }),
})

const app = express()

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

app.get('/', (_, res) => {
  res.send({
    name: 'Guestbook',
    version: '1.0.0',
  })
})

app.get('/auth/github', async (_, res) => {
  return authorize(res)
})

app.get('/auth/github/callback', async (req, res) => {
  return await oauth(req, res)
})

httpServer.listen({ port: config.server.port }, () => {
  console.log(`🚀 Server ready at http://localhost:${config.server.port}/`)
})
