import { auth } from './logics/lucia'

import type { MiddlewareResponseHandler } from 'astro'

export const onRequest: MiddlewareResponseHandler = async(context, next) => {
  context.locals.auth = auth.handleRequest(context)
  await next()
}
