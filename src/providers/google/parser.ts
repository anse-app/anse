import { createParser } from 'eventsource-parser'
import type { Message } from '@/types/message'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'

export const parseMessageList = (rawList: Message[]) => {
  interface GoogleGeminiMessage {
    role: 'user' | 'model'
    // TODO: Add support for image input
    parts: [
      { text: string },
    ]
  }

  if (rawList.length === 0)
    return []

  const parsedList: GoogleGeminiMessage[] = []
  // if first message is system message, insert an empty message after it
  if (rawList[0].role === 'system') {
    parsedList.push({ role: 'user', parts: [{ text: rawList[0].content }] })
    parsedList.push({ role: 'model', parts: [{ text: 'OK.' }] })
  }
  // covert other messages
  const roleDict = {
    user: 'user',
    assistant: 'model',
  } as const
  for (const message of rawList) {
    if (message.role === 'system')
      continue
    parsedList.push({
      role: roleDict[message.role],
      parts: [{ text: message.content }],
    })
  }
  return parsedList
}

export const parseStream = (rawResponse: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const rb = rawResponse.body as ReadableStream

  return new ReadableStream({
    async start(controller) {
      const streamParser = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          try {
            const json = JSON.parse(data)
            const text = json.candidates[0].content.parts[0].text || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }
      const reader = rb.getReader()
      const parser = createParser(streamParser)
      let done = false
      while (!done) {
        const { done: isDone, value } = await reader.read()
        if (isDone) {
          done = true
          controller.close()
          return
        }
        parser.feed(decoder.decode(value))
      }
    },
  })
}
