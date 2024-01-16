import { fetchChatCompletion, fetchImageGeneration } from './api'
import { parseStream } from './parser'
import type { Message } from '@/types/message'
import type { HandlerPayload, Provider } from '@/types/provider'

export const handlePrompt: Provider['handlePrompt'] = async(payload, signal?: AbortSignal) => {
  if (payload.botId === 'chat_continuous')
    return handleChatCompletion(payload, signal)
  if (payload.botId === 'chat_single')
    return handleChatCompletion(payload, signal)
  if (payload.botId === 'image_generation')
    return handleImageGeneration(payload)
}

export const handleRapidPrompt: Provider['handleRapidPrompt'] = async(prompt, globalSettings) => {
  const rapidPromptPayload = {
    conversationId: 'temp',
    conversationType: 'chat_single',
    botId: 'temp',
    model: 'glm-3-turbo',
    globalSettings: {
      ...globalSettings,
      model: 'glm-3-turbo',
      temperature: 0.4,
      maxTokens: 2048,
      top_p: 1,
      stream: false,
    },
    botSettings: {},
    prompt,
    messages: [{ role: 'user', content: prompt }],
  } as HandlerPayload
  const result = await handleChatCompletion(rapidPromptPayload)
  if (typeof result === 'string')
    return result
  return ''
}

const handleChatCompletion = async(payload: HandlerPayload, signal?: AbortSignal) => {
  // An array to store the chat messages
  const messages: Message[] = []

  let maxTokens = payload.globalSettings.maxTokens as number
  let messageHistorySize = payload.globalSettings.messageHistorySize as number

  // Iterate through the message history
  while (messageHistorySize > 0) {
    messageHistorySize--
    // Get the last message from the payload
    const m = payload.messages.pop()
    if (m === undefined)
      break

    if (maxTokens - m.content.length < 0)
      break

    maxTokens -= m.content.length
    messages.unshift(m)
  }

  const response = await fetchChatCompletion({
    apiKey: payload.globalSettings.apiKey as string,
    body: {
      prompt: messages,
      max_tokens: maxTokens,
      model: payload.model || payload.globalSettings.model as string,
      temperature: payload.globalSettings.temperature as number,
      top_p: payload.globalSettings.topP as number,
    },
    signal,
  })
  if (!response.ok) {
    const responseJson = await response.json()
    console.log('responseJson', responseJson)
    const errMessage = responseJson.error?.message || response.statusText || 'Unknown error'
    throw new Error(errMessage, { cause: responseJson.error })
  }
  const isStream = response.headers.get('content-type')?.includes('text/event-stream')
  if (isStream) {
    return parseStream(response)
  } else {
    const resJson = await response.json()
    return resJson.data.choices[0].content as string
  }
}

const handleImageGeneration = async(payload: HandlerPayload) => {
  const prompt = payload.prompt
  const response = await fetchImageGeneration({
    apiKey: payload.globalSettings.apiKey as string,
    body: {
      model: 'cogview-3',
      prompt,
    },
  })
  if (!response.ok) {
    const responseJson = await response.json()
    const errMessage = responseJson.error?.message || response.statusText || 'Unknown error'
    throw new Error(errMessage)
  }
  const resJson = await response.json()
  return resJson.data[0].url
}
