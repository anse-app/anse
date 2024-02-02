import { getSettingsByProviderId } from '@/stores/settings'
import type { HandlerPayload } from '@/types/provider'

export const generateRapidProviderPayload = (prompt: string, providerId: string) => {
  const payload = {
    conversationId: 'temp',
    conversationType: 'chat_single',
    botId: 'temp',
    model: '',
    globalSettings: getSettingsByProviderId(providerId),
    botSettings: {},
    prompt,
    messages: [],
  } as HandlerPayload
  return payload
}

export const promptHelper = {
  summarizeText: (text: string) => {
    return [
      'Summarize a short and relevant title of input with no more than 5 words.',
      'Rules:',
      '1. Must use the same language as input.',
      '2. Output the title directly, do not add any other content.',
      'The input is:',
      text,
    ].join('\n')
  },
}
