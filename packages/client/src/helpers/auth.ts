export const setLogin = async (bearer: any) => {
  localStorage.setItem('token', bearer)

  try {
    const response = await fetch(`https://api.github.com/user`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${bearer}`
      }
    })

    const { id, avatar_url, name} = await response.json()

    localStorage.setItem('userId', id)
    localStorage.setItem('tokenAvatarUrl', avatar_url)
    localStorage.setItem('tokenName', name)

    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}

export const isLoggedIn = () => {
  const hasToken = localStorage.getItem('token')

  if (hasToken) {
    return true
  }

  return false
}

export const isSameUser = (githubId: string) => {
  const storedGithubId = localStorage.getItem('userId')

  if (storedGithubId === githubId) {
    return true
  }

  return false
}
