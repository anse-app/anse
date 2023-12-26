import type { Message } from '@/types/message'

export const parseMessageList = (rawList: Message[]) => {
  interface GoogleGeminiMessage {
    role: 'user' | 'model'
    // TODO: Add support for image input
    parts: [
      { text: string },
    ] | [ { text: string }, { inline_data: { mime_type: 'image/jpeg', data: string } }]
  }

  if (rawList.length === 0)
    return []

  const parsedList: GoogleGeminiMessage[] = []
  // if first message is system message, insert an empty message after it
  if (rawList[0].role === 'system') {
    // @ts-ignore
    parsedList.push({ role: 'user', parts: [{ text: rawList[0].content }] })
    parsedList.push({ role: 'model', parts: [{ text: 'OK.' }] })
  }
  // covert other messages
  const roleDict = {
    user: 'user',
    assistant: 'model',
  } as const
  // TODO: 转成 https://ai.google.dev/tutorials/rest_quickstart
  for (const message of rawList) {
    if (message.role === 'system')
      continue
    if (Array.isArray(message.content)) {
      parsedList.push({
        role: roleDict[message.role],
        // @ts-ignore
        parts: message.content.map((v) => {
          if (v.type === 'text') return { text: v.text }
          return { inline_data: { mime_type: 'image/jpeg', data: btoa(v.image_url.url) } }
        }),
      })
    } else {
      parsedList.push({
        role: roleDict[message.role],
        parts: [{ text: message.content }],
      })
    }
  }
  return parsedList
}
