import React, { useState, useEffect } from 'react'
import {
  Redirect
} from "react-router-dom"
import { setLogin } from '../helpers/auth'

interface LoginRedirectProps {
  token: any
}

const LoginRedirect: React.FC<LoginRedirectProps> = ({ token }) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    setLogin(token).then(() => setState(token))
  }, [token])

  return state === null ? <div>Loading...</div> : <Redirect to="/" />
}

export default LoginRedirect
