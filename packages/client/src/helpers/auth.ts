import got from 'got'

export const setLogin = async (bearer: any) => {
  console.log('LOGIN')

  const query = `
    query {
      user {
        name
        id
        avatar_url
      }
    }
  `
  try {
    const response: any = await got.post(`${process.env.REACT_APP_API_BASE_URI}/graphql`, {
      body: JSON.stringify({ query }),
      headers: {
        Authorization: `token ${bearer}`,
      },
      responseType: 'json',
    })

    // const user = JSON.parse(response.body)
    // console.log(response.body)
    localStorage.setItem('token', bearer)
  } catch (err) {
    throw new Error('Unauthorized access!')
  }
}

export const storeUser = (user: any) => {
  console.log(user)
  localStorage.setItem('userId', user.id)
  localStorage.setItem('userName', user.name)
  localStorage.setItem('tokenAvatarUrl', user.avatar_url)
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
