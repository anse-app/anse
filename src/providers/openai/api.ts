// api.ts

/**
 * Interface for the payload required for fetching data from OpenAI API
 */
export interface OpenAIFetchPayload {
  apiKey: string // API Key for authorization
  baseUrl: string // Base URL for the OpenAI API
  body: Record<string, any> // Request body data
  signal?: AbortSignal // AbortSignal for cancelling the request
}

/**
 * Function to fetch chat completions from the OpenAI API
 * @param payload Payload containing required data for fetching chat completions
 * @returns A Promise resolving to the fetch response
 */
export const fetchChatCompletion = async(payload: OpenAIFetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }

  return fetch(`${payload.baseUrl}/v1/chat/completions`, initOptions)
}

/**
 * Function to fetch image generations from the OpenAI API
 * @param payload Payload containing required data for fetching image generations
 * @returns A Promise resolving to the fetch response
 */
export const fetchImageGeneration = async(payload: OpenAIFetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }

  return fetch(`${payload.baseUrl}/v1/images/generations`, initOptions)
}
