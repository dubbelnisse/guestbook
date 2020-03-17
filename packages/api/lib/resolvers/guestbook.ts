import { gql, IResolvers, AuthenticationError } from 'apollo-server-express'
import { pubsub } from '../server'

const POST_ADDED = 'POST_ADDED'

export const typeDefs = gql`
  type Post {
    id: String!
    text: String!
    author_id: String!
    author_name: String!
    author_avatar: String!
    likes: Int
    created: String!
  }

  input PostInput {
    text: String!
  }

  input UpdatePostInput {
    text: String!
    post_id: String!
  }

  extend type Query {
    posts: [Post!]
  }

  extend type Mutation {
    addPost(input: PostInput!): Post! @isAuthenticated
    updatePost(input: UpdatePostInput!): Post! @isAuthenticated
    removePost(post_id: String!): Boolean @isAuthenticated
    likePost(post_id: String!): Boolean
  }

  type Subscription {
    postAdded: Post!
  }
`

export const resolvers: IResolvers = {
  Query: {
    posts: async (_, _x, { db }) =>
      await db
        .select(
          'po.id',
          'po.text',
          'po.author_id',
          'po.author_name',
          'po.author_avatar',
          'po.created_at AS created',
          'li.likes'
        )
        .from('posts AS po')
        .leftOuterJoin('likes AS li', 'li.post_id', 'po.id')
        .orderBy('created', 'desc'),
  },
  Mutation: {
    addPost: async (_, { input }, { auth, db }) => {
      const { user } = await auth

      const [post] = await db('posts').insert(
        {
          text: input.text,
          author_id: user.id,
          author_avatar: user.avatar_url,
          author_name: user.name,
        },
        ['*']
      )

      pubsub.publish(POST_ADDED, { postAdded: post })

      return post
    },
    updatePost: async (_, { input }, { auth, db }) => {
      const { user } = await auth
      const post = await db
        .select('id', 'author_id')
        .from('posts')
        .where('id', input.post_id)
        .first()

      if (user.id !== post.author_id) {
        throw new AuthenticationError('Unauthorized access!')
      }

      await db('posts')
        .where('id', input.post_id)
        .update({
          text: input.text,
        })

      return {
        id: post.id,
        text: input.text,
      }
    },
    removePost: async (_, { post_id }, { auth, db }) => {
      const { user } = await auth
      const post = await db
        .select('author_id')
        .from('posts')
        .where('id', post_id)
        .first()

      if (user.id !== post.author_id) {
        throw new AuthenticationError('Unauthorized access!')
      }

      await db('likes')
        .where('post_id', post_id)
        .del()

      await db('posts')
        .where('id', post_id)
        .del()

      return true
    },
    likePost: async (_, { post_id }, { db }) => {
      console.log(post_id)
      const like = await db('likes')
        .where('post_id', post_id)
        .first()

      if (like) {
        await db('likes')
          .where('id', like.id)
          .update({
            likes: like.likes + 1,
          })
      } else {
        await db('likes').insert({
          post_id,
          likes: 1,
        })
      }

      return true
    },
  },

  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
}
