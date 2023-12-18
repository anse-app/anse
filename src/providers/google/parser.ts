import type { Message } from '@/types/message'

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
