import { OAuthRequestError } from '@lucia-auth/oauth'
import { auth, githubAuth } from '../../../logics/lucia.js'
import type { APIRoute } from 'astro'

export const get: APIRoute = async(context) => {
  const storedState = context.cookies.get('github_oauth_state').value
  const state = context.url.searchParams.get('state')
  const code = context.url.searchParams.get('code')
  console.log(storedState, state, code)
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }
  try {
    const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code)

    const getUser = async() => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser
      const user = await createUser({
        attributes: {
          username: githubUser.login,
        },
      })
      return user
    }

    const user = await getUser()
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    context.locals.auth.setSession(session)
    return context.redirect('/', 302) // redirect to profile page
  } catch (e) {
    console.log('error:', e)
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}
