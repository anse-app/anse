export interface AzureFetchPayload {
  apiKey: string
  baseUrl: string
  body: Record<string, any>
  model?: string
  signal?: AbortSignal
}

export const fetchChatCompletion = async(payload: AzureFetchPayload) => {
  const { baseUrl, apiKey, body, model, signal } = payload || {}
  const initOptions = {
    headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
    method: 'POST',
    body: JSON.stringify({ ...body }),
    signal,
  }
  return fetch(`${baseUrl}/openai/deployments/${model}/chat/completions?api-version=2023-08-01-preview`, initOptions)
}

export const fetchImageGeneration = async(payload: AzureFetchPayload) => {
  const { baseUrl, apiKey, body } = payload || {}
  const initOptions = {
    headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
    method: 'POST',
    body: JSON.stringify(body),
  }
  return fetch(`${baseUrl}.openai.azure.com/openai/images/generations:submit?api-version=2023-08-01-preview`, initOptions)
}
