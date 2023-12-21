export interface Message {
  role: 'system' | 'user' | 'assistant'
  content:
  | string
  | [
    { type: 'text', text: string },
    {
      type: 'image_url'
      image_url: {
        url: string
        detail: 'auto'
      }
    },
  ]
}

/** Used in app */
export interface MessageInstance extends Message {
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
