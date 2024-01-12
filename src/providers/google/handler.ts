import { fetchChatCompletion } from './api'
import { parseMessageList, parseStream } from './parser'
import type { Message } from '@/types/message'
import type { HandlerPayload, Provider } from '@/types/provider'

export const handlePrompt: Provider['handlePrompt'] = async(payload, signal?: AbortSignal) => {
  if (payload.botId === 'chat_continuous')
    return handleChatCompletion(payload, signal)
  if (payload.botId === 'chat_single')
    return handleChatCompletion(payload, signal)
}

export const handleRapidPrompt: Provider['handleRapidPrompt'] = async(prompt, globalSettings) => {
  const rapidPromptPayload = {
    conversationId: 'temp',
    conversationType: 'chat_single',
    botId: 'temp',
    globalSettings: {
      ...globalSettings,
      model: 'gemini-pro',
    },
    botSettings: {},
    prompt,
    messages: { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
  } as unknown as HandlerPayload
  const result = await handleChatCompletion(rapidPromptPayload)
  if (typeof result === 'string')
    return result
  return ''
}

export const handleChatCompletion = async(payload: HandlerPayload, signal?: AbortSignal) => {
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

  const stream = payload.globalSettings.stream as boolean ?? true
  const response = await fetchChatCompletion({
    apiKey: payload.globalSettings.apiKey as string,
    stream,
    body: {
      contents: parseMessageList(messages),
    },
    model: payload.globalSettings.model as string,
  })

  if (response.ok) {
    if (stream)
      return parseStream(response)
    const json = await response.json()
    // console.log('json', json)
    const output = json.candidates[0].content.parts[0].text || json
    return output as string
  }

  const text = await response.text()
  throw new Error(`Failed to fetch chat completion: ${text}`)
}
