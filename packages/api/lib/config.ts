import configPackage from '@iteam/config'

interface Server {
  port: number
}

interface Auth {
  secret: string
  githubClient: string
  githubSecret: string
  baseUrl: string
  loginUri: string
  callbackUri: string
  redirectUri: string
}

interface Db {
  host: string
  user: string
  password: string
  database: string
}

export interface Config {
  server: Server
  auth: Auth
  db: Db
}

const config = configPackage({
  file: `${__dirname}/../config.json`,
  defaults: {
    server: {
      port: 4000,
    },
    auth: {
      secret:
        'This is a long default key that needs to be changed in production',
      githubClient: '',
      githubSecret: '',
      baseUrl: 'http://localhost:4000',
      loginUri: '/auth/github',
      callbackUri: '/auth/github/callback',
      redirectUri: 'http://localhost:3000/auth/github/callback',
    },
    db: {
      host: '127.0.0.1',
      user: 'nisse',
      password: 'kalleanka321',
      database: 'guestbook',
    },
  },
})

export default {
  auth: config.get('auth'),
  server: config.get('server'),
  db: config.get('db'),
} as Config
