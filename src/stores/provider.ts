import providerOpenAI from '@/providers/openai'
import providerReplicate from '@/providers/replicate'
import { allConversationTypes } from '@/types/conversation'
import type { BotMeta } from '@/types/app'

export const providerList = [
  providerOpenAI(),
  providerReplicate(),
]

export const providerMetaList = providerList.map(provider => ({
  id: provider.id,
  name: provider.name,
  icon: provider.icon,
  bots: provider.bots,
}))

export const platformSettingsUIList = providerList.map(provider => ({
  id: provider.id,
  icon: provider.icon,
  name: provider.name,
  settingsUI: provider.globalSettings,
}))

const botMetaMap = providerMetaList.reduce((acc, provider) => {
  provider.bots.forEach((bot) => {
    if (allConversationTypes.includes(bot.type)) {
      acc[`${provider.id}:${bot.id}`] = {
        value: `${provider.id}:${bot.id}`,
        type: bot.type,
        label: bot.name,
        provider: {
          id: provider.id,
          name: provider.name,
          icon: provider.icon,
        },
        settingsUI: bot.settings,
      }
    }
  })
  return acc
}, {} as Record<string, BotMeta>)

export const botMetaList = Object.values(botMetaMap)

export const getProviderById = (id: string) => {
  return providerList.find(provider => provider.id === id)
}

export const getBotMetaById = (id: string) => {
  return botMetaMap[id] || null
}
