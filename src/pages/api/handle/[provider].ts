import { callProviderHandler } from '@/logics/conversation'
import type { APIRoute } from 'astro'
import type { HandlerPayload } from '@/types/provider'
import type { ErrorMessage } from '@/types/message'

export const post: APIRoute = async({ params, request }) => {
  const providerId = params.provider as string
  const body = await request.json() as HandlerPayload

  try {
    if (!providerId) throw new Error('Provider ID is required')
    const providerResponse = await callProviderHandler(providerId, body)
    const isStream = providerResponse instanceof ReadableStream
    return new Response(providerResponse, {
      headers: {
        'Content-Type': isStream ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8',
      },
    })
  } catch (e) {
    const error = e as Error
    const cause = error?.cause as ErrorMessage
    console.error(e)
    return new Response(JSON.stringify({
      error: cause,
    }), {
      status: 500,
    })
  }
}
