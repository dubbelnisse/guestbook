import { gql, IResolvers } from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    avatar_url: String!
  }

  extend type Query {
    user: User! @isAuthenticated
  }
`

export const resolvers: IResolvers = {
  Query: {
    user: async (_, _x, { auth }) => {
      const { user } = await auth

      return user
    },
  },
}
