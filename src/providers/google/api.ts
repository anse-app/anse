export interface GoogleFetchPayload {
  apiKey: string
  stream: boolean
  body: Record<string, any>
  model?: string
}

export const fetchChatCompletion = async(payload: GoogleFetchPayload) => {
  const { apiKey, body, model, stream } = payload || {}
  const initOptions = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ ...body }),
  }
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?${stream ? 'alt=sse&' : ''}key=${apiKey}`, initOptions)
}
