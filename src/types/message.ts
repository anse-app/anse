interface MessageBase {
  role: 'system' | 'user' | 'assistant' | 'function'
  content: string
}

interface MessageText extends MessageBase {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface MessageFunction extends MessageBase {
  role: 'function'
  input: FunctionCallMessage
  name: string
  content: string
}

export type Message = MessageText | MessageFunction

export interface FunctionCallMessage {
  name: string
  arguments: Record<string, any>
}

/** Used in app */
export type MessageInstance = Message & {
  id: string
  stream?: boolean
  dateTime?: number
  isSelected?: boolean
}

export interface ErrorMessage {
  code: string
  message: string
}

export interface StreamInstance {
  messageId: string
  stream: ReadableStream
}
