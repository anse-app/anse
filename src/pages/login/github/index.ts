import { githubAuth } from '../../../logics/lucia'

import type { APIRoute } from 'astro'

export const get: APIRoute = async(context) => {
  const [url, state] = await githubAuth.getAuthorizationUrl()
  context.cookies.set('github_oauth_state', state, {
    httpOnly: true,
    secure: !import.meta.env.DEV,
    path: '/',
    maxAge: 60 * 60,
  })
  return context.redirect(url.toString(), 302)
}
