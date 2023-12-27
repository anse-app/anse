import { action, atom, map } from 'nanostores'
import { conversationMessagesMapData } from './tests/message.mock'
import { db } from './storage/message'
import { updateConversationById } from './conversation'
import type { MessageInstance } from '@/types/message'

export const conversationMessagesMap = map<Record<string, MessageInstance[]>>({})
export const shareMessageIds = atom<string[]>([])

export const rebuildMessagesStore = async() => {
  const data = await db.exportData() || {}
  conversationMessagesMap.set(data)
  // conversationMessagesMap.set(conversationMessagesMapData)
}

export const getMessagesByConversationId = (id: string) => {
  return conversationMessagesMap.get()[id] || []
}

export const updateMessage = action(
  conversationMessagesMap,
  'updateMessage',
  (map, conversationId: string, id: string, payload: Partial<MessageInstance>) => {
    const oldMessages = map.get()[conversationId] || []
    const newMessages = oldMessages.map((message) => {
      if (message.id === id) {
        return {
          ...message,
          ...payload,
        }
      }
      return message
    })
    map.setKey(conversationId, newMessages)
    db.setItem(conversationId, newMessages)
  },
)

export const pushMessageByConversationId = action(
  conversationMessagesMap,
  'pushMessageByConversationId',
  (map, id: string, payload: MessageInstance) => {
    const oldMessages = map.get()[id] || []
    if (oldMessages[oldMessages.length - 1]?.id === payload.id) return
    map.setKey(id, [...oldMessages, payload])
    db.setItem(id, [...oldMessages, payload])
    updateConversationById(id, {
      lastUseTime: Date.now(),
    })
  },
)

export const clearMessagesByConversationId = action(
  conversationMessagesMap,
  'clearMessagesByConversationId',
  (map, id: string, deleteChat?: boolean) => {
    map.setKey(id, [])
    db.deleteItem(id)
    !deleteChat && updateConversationById(id, {
      lastUseTime: Date.now(),
    })
  },
)

export const deleteMessageByConversationId = action(
  conversationMessagesMap,
  'deleteMessageByConversationId',
  (map, id: string, payload: MessageInstance) => {
    const oldMessages = map.get()[id] || []
    map.setKey(id, [...oldMessages.filter(message => message.id !== payload.id)])
    db.setItem(id, [...oldMessages.filter(message => message.id !== payload.id)])
    updateConversationById(id, {
      lastUseTime: Date.now(),
    })
  },
)

export const spliceMessageByConversationId = action(
  conversationMessagesMap,
  'spliceMessagesByConversationId',
  (map, id: string, payload: MessageInstance) => {
    const oldMessages = map.get()[id] || []
    const currentIndex = oldMessages.findIndex(message => message.id === payload.id)
    map.setKey(id, [...oldMessages.slice(0, currentIndex + 1)])
    db.setItem(id, [...oldMessages.slice(0, currentIndex + 1)])
    updateConversationById(id, {
      lastUseTime: Date.now(),
    })
  },
)

export const spliceUpdateMessageByConversationId = action(
  conversationMessagesMap,
  'spliceMessagesByConversationId',
  (map, id: string, payload: MessageInstance) => {
    const oldMessages = map.get()[id] || []
    const currentIndex = oldMessages.findIndex(message => message.id === payload.id)
    map.setKey(id, [...oldMessages.slice(0, currentIndex), payload])
    db.setItem(id, [...oldMessages.slice(0, currentIndex), payload])
    updateConversationById(id, {
      lastUseTime: Date.now(),
    })
  },
)
