import { action, atom, computed, map } from 'nanostores'
import { botMetaList } from './provider'
import { clearMessagesByConversationId } from './messages'
import { conversationMapData } from './tests/conversation.mock'
import { db } from './storage/conversation'
import type { Conversation } from '@/types/conversation'

export const conversationMap = map<Record<string, Conversation>>({})
export const currentConversationId = atom('')
export const currentConversation = computed(currentConversationId, (id) => {
  return id ? conversationMap.get()[id] as Conversation : null
})
export const currentEditingConversationId = atom<string | null>('')
export const currentEditingConversation = computed(currentEditingConversationId, (id) => {
  return id ? conversationMap.get()[id] as Conversation : null
})
export const conversationMapSortList = computed(conversationMap, (map) => {
  return Object.values(map).sort((a, b) => b.lastUseTime - a.lastUseTime)
})

const migrateConversationStoreIfNeeded = () => {
  const rawData = conversationMap.get()
  Object.values(rawData).forEach((conversation) => {
    // @ts-expect-error migrate old data
    if (conversation.providerId && conversation.conversationType) {
      const typeDict = {
        single: 'chat_single',
        continuous: 'chat_continuous',
        image: 'image_generation',
      }
      const providerDict = {
        'provider-stable-diffusion': 'provider-replicate',
      }
      const newConversationData = {
        id: conversation.id,
        // @ts-expect-error migrate old data
        bot: `${providerDict[conversation.providerId] || conversation.providerId}:${typeDict[conversation.conversationType] || 'chat_single'}`,
        name: conversation.name,
        icon: '',
        systemInfo: conversation.systemInfo,
        mockMessages: conversation.mockMessages,
        lastUseTime: conversation.lastUseTime,
      }
      conversationMap.setKey(conversation.id, newConversationData)
      db.setItem(conversation.id, newConversationData)
    }
  })
}

export const rebuildConversationStore = async() => {
  const data = await db.exportData() || {}
  conversationMap.set(data)
  // conversationMap.set(conversationMapData)
  migrateConversationStoreIfNeeded()
}

export const addConversation = action(conversationMap, 'addConversation', (map, instance?: Partial<Conversation>) => {
  const instanceId = instance?.id || `id_${Date.now()}`
  const conversation: Conversation = {
    id: instanceId,
    bot: botMetaList[0]?.value,
    name: instance?.name || '',
    icon: instance?.icon || '',
    lastUseTime: Date.now(),
  }
  map.setKey(instanceId, conversation)
  db.setItem(instanceId, conversation)
  currentConversationId.set(instanceId)
})

export const updateConversationById = action(conversationMap, 'updateConversationById', (map, id: string, payload: Partial<Conversation>) => {
  const conversation = {
    ...map.get()[id],
    ...payload,
  }
  map.setKey(id, conversation)
  db.updateItem(id, conversation)
})

export const deleteConversationById = action(conversationMap, 'deleteConversationById', (map, id: string) => {
  map.set(Object.fromEntries(Object.entries(map.get()).filter(([key]) => key !== id)))
  db.deleteItem(id)
  clearMessagesByConversationId(id, true)
})
