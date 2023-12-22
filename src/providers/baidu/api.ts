export interface OpenAIFetchPayload {
  apiKey: string
  body: Record<string, any>
  enpoint: string
  signal?: AbortSignal
}

export const fetchChatCompletion = async(payload: OpenAIFetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }
  return fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${payload.enpoint}?access_token=${payload.apiKey}`, initOptions)
}

export const fetchImageGeneration = async(payload: OpenAIFetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
    signal: payload.signal,
  }
  return fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/text2image/${payload.enpoint}?access_token=${payload.apiKey}`, initOptions)
}
