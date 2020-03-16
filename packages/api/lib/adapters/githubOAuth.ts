import githubOAuth from 'github-oauth'
import config from '../config'

export default githubOAuth({
  githubClient: config.auth.githubClient,
  githubSecret: config.auth.githubSecret,
  baseURL: config.auth.baseUrl,
  loginURI: config.auth.loginUri,
  callbackURI: config.auth.callbackUri,
})
