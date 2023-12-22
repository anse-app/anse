import { lucia } from 'lucia'
import { pg } from '@lucia-auth/adapter-postgresql'
import { astro } from 'lucia/middleware'
import { db } from '@vercel/postgres'
import { github } from '@lucia-auth/oauth/providers'

// expect error (see next section)
export const auth = lucia({
  env: import.meta.env.DEV ? 'DEV' : 'PROD',
  middleware: astro(),
  adapter: pg(db, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes: (data) => {
    return {
      githubUsername: data.username,
    }
  },
})
export const githubAuth = github(auth, {
  clientId: import.meta.env.GITHUB_CLIENT_ID,
  clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
})

export type Auth = typeof auth

// run vercel qg Query
// https://lucia-auth.com/database-adapters/postgres/
