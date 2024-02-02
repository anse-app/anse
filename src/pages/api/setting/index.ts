import { getSetting, setSetting } from '@/logics/lucia'
import type { APIRoute } from 'astro'

export const get: APIRoute = async({ url: { searchParams } }) => {
  const id = searchParams.get('id') as string
  const res = await getSetting(id)
  return new Response(JSON.stringify(res), { status: 200 })
}

export const post: APIRoute = async({ request }) => {
  const body = await request.json() as { id: string, value: string }
  await setSetting(body.id, body.value)
  return new Response(null, { status: 200 })
}
