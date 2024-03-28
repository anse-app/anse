export interface OpenAIFetchPayload {
  apiKey: string
  baseUrl: string
  body: Record<string, any>
  signal?: AbortSignal
}

const fetchFromOpenAI = async(path: string, payload: OpenAIFetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }
  return fetch(`${payload.baseUrl}/${path}`, initOptions)
}

export const fetchChatCompletion = async(payload: OpenAIFetchPayload) => {
  return fetchFromOpenAI('v1/chat/completions', payload)
}

export const fetchImageGeneration = async(payload: OpenAIFetchPayload) => {
  return fetchFromOpenAI('v1/images/generations', payload)
}
