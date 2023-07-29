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
  name: string
  content: string
}

export type Message = MessageText | MessageFunction

export interface FunctionCallMessage {
  type: 'function_call'
  name: string
  arguments: Record<string, any>
}

/** Used in app */
export type MessageInstance = Message & {
  id: string
  stream?: boolean
  dateTime?: number
  isSelected?: boolean
  functionCallInput?: FunctionCallMessage
}

export interface ErrorMessage {
  code: string
  message: string
}

export interface StreamInstance {
  messageId: string
  stream: ReadableStream
}
