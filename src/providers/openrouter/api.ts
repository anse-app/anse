export interface OpenAIFetchPayload {
  apiKey: string
  body: Record<string, any>
  signal?: AbortSignal
}

export const fetchChatCompletion = async(payload: OpenAIFetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.apiKey}`,
      'HTTP-Referer': 'https://ai.leeapp.cn',
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }
  return fetch('https://openrouter.ai/api/v1/chat/completions', initOptions)
}
