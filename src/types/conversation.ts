export const allConversationTypes = ['chat_single', 'chat_continuous', 'image_generation'] as const
export type ConversationType = typeof allConversationTypes[number]

export interface Conversation {
  id: string
  bot: string
  name: string
  icon: string
  systemInfo?: string
  mockMessages?: string
  lastUseTime: number
}
