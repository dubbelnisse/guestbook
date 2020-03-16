import { Request, Response } from 'express'
import { AuthenticationError } from 'apollo-server-express'
import got from 'got'
import config from '../config'
import crypto from 'crypto'
import url from 'url'

export const authenticateFunc = async ({ req }: any) => {
  const authorization = req && req.headers && req.headers.authorization
  if (!authorization) {
    throw new AuthenticationError('Unauthorized access!')
  }

  try {
    const token = authorization.replace('Bearer ', '')
    const response: any = await got('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    })

    const user = JSON.parse(response.body)

    return {
      user: {
        name: user.name,
        id: user.id,
        avatar_url: user.avatar_url,
      },
    }
  } catch (err) {
    throw new AuthenticationError('Unauthorized access!')
  }
}

export const authorize = (res: Response) => {
  const state = crypto.randomBytes(8).toString('hex')

  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${config.auth.githubClient}&redirect_uri=${config.auth.baseUrl}${config.auth.callbackUri}&state=${state}`
  )
}

export const oauth = async (req: Request, res: Response) => {
  const { code, state } = url.parse(req.url, true).query

  try {
    const response = await got(
      `https://github.com/login/oauth/access_token?client_id=${config.auth.githubClient}&client_secret=${config.auth.githubSecret}&code=${code}&state=${state}`
    )

    return res.redirect(`${config.auth.redirectUri}?${response.body}`)
  } catch (error) {
    console.log(error.response.body)
  }
}
