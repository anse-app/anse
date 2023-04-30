export type ConversationType = 'chat:single' | 'chat:continuous' | 'image:generation'

export interface Conversation {
  id: string
  providerId: string
  conversationType: ConversationType
  name: string
  icon: string
  systemInfo?: string
  mockMessages?: string
  lastUseTime: number
}
