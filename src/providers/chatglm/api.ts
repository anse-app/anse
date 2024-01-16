import { SignJWT } from 'jose'

export interface OpenAIFetchPayload {
  apiKey: string
  body: Record<string, any>
  signal?: AbortSignal
}

export const fetchChatCompletion = async(payload: OpenAIFetchPayload) => {
  const [id, secret] = payload.apiKey.split('.')
  const timestamp = Date.now()
  const token = await new SignJWT({
    api_key: id, exp: timestamp + 3600 * 1000, timestamp,
  })
    .setProtectedHeader({ alg: 'HS256', sign_type: 'SIGN' })
    .sign(new TextEncoder().encode(secret))

  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }
  return fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', initOptions)
}

export const fetchImageGeneration = async(payload: OpenAIFetchPayload) => {
  const [id, secret] = payload.apiKey.split('.')
  const timestamp = Date.now()
  const token = await new SignJWT({
    api_key: id, exp: timestamp + 3600 * 1000, timestamp,
  })
    .setProtectedHeader({ alg: 'HS256', sign_type: 'SIGN' })
    .sign(new TextEncoder().encode(secret))

  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }
  return fetch('https://open.bigmodel.cn/api/paas/v4/images/generations', initOptions)
}
