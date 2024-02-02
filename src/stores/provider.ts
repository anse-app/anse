import providerOpenAI from '@/providers/openai'
import providerOpenRouter from '@/providers/openrouter'
import providerAzure from '@/providers/azure'
import providerGoogle from '@/providers/google'
import providerReplicate from '@/providers/replicate'
import providerFal from '@/providers/fal'
import providerGlm from '@/providers/chatglm'
import probiderBaidu from '@/providers/baidu'
import { allConversationTypes } from '@/types/conversation'
import type { BotMeta } from '@/types/app'

export const providerList = [
  providerOpenAI(),
  providerOpenRouter(),
  providerGlm(),
  providerAzure(),
  providerGoogle(),
  probiderBaidu(),
  providerReplicate(),
  providerFal(),
]

export const providerMetaList = providerList.map(provider => ({
  id: provider.id,
  name: provider.name,
  icon: provider.icon,
  bots: provider.bots,
  models: provider.models,
}))

export const platformSettingsUIList = providerList.map(provider => ({
  id: provider.id,
  icon: provider.icon,
  name: provider.name,
  href: provider.href,
  settingsUI: provider.globalSettings,
}))

const botMetaMap = providerMetaList.reduce((acc, provider) => {
  provider.bots.forEach((bot) => {
    if (allConversationTypes.includes(bot.type)) {
      acc[`${provider.id}:${bot.id}`] = {
        value: `${provider.id}:${bot.id}`,
        type: bot.type,
        label: bot.name,
        models: provider.models,
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

export const getModelsByBotId = (id: string) => {
  return botMetaMap[id].models
}
