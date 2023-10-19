import { defineMiddleware } from 'astro/middleware'

export const onRequest = defineMiddleware((context, next) => {
  // If a basic auth header is present, it wil take the string form: "Basic authValue"
  const basicAuth = context.request.headers.get('authorization')

  if (basicAuth) {
    // Get the auth value from string "Basic authValue"
    const authValue = basicAuth.split(' ')[1] ?? 'username:password'

    // Decode the Base64 encoded string via atob (https://developer.mozilla.org/en-US/docs/Web/API/atob)
    // Get the username and password. NB: the decoded string is in the form "username:password"
    const [username, pwd] = atob(authValue).split(':')

    // check if the username and password are valid
    if (username === import.meta.env.USERNAME && pwd === import.meta.env.PASSWORD) {
      // forward request
      return next()
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-authenticate': 'Basic realm="Secure Area"',
    },
  })
})
