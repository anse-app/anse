import { getPluginById } from '@/stores/plugin'
import type { APIRoute } from 'astro'
import type { PluginPayload } from '@/types/plugin'

export const post: APIRoute = async({ params, request }) => {
  const pluginId = params.id as string
  const body = await request.json() as PluginPayload

  const plugin = getPluginById(pluginId)

  if (!plugin) {
    return new Response(JSON.stringify({
      code: 1,
      message: 'Plugin not found',
    }))
  }

  const parameters = body.parameters

  const result = await plugin.handleCall(parameters)

  return new Response(JSON.stringify({
    code: 0,
    pluginId,
    plugin,
    parameters,
    result,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // try {
  //   if (!providerId) throw new Error('Provider ID is required')
  //   const providerResponse = await callProviderHandler(providerId, body)
  //   const isStream = providerResponse instanceof ReadableStream
  //   return new Response(providerResponse, {
  //     headers: {
  //       'Content-Type': isStream ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8',
  //     },
  //   })
  // } catch (e) {
  //   const error = e as Error
  //   const cause = error?.cause as ErrorMessage
  //   console.error(e)
  //   return new Response(JSON.stringify({
  //     error: cause,
  //   }), {
  //     status: 500,
  //   })
  // }
}
