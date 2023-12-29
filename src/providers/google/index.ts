import {
  handlePrompt,
  handleRapidPrompt,
} from './handler'
import type { Provider } from '@/types/provider'

const providerGoogle = () => {
  const provider: Provider = {
    id: 'provider-google',
    icon: 'i-simple-icons-google', // @unocss-include
    name: 'Google',
    globalSettings: [
      {
        key: 'apiKey',
        name: 'API Key',
        type: 'api-key',
      },
      {
        key: 'model',
        name: 'Google model',
        description: 'Custom model for Google API.',
        type: 'select',
        options: [
          { value: 'gemini-pro', label: 'gemini-pro' },
        ],
        default: 'gemini-pro',
      },
      {
        key: 'maxTokens',
        name: 'Max Tokens',
        description: 'The maximum number of tokens to generate in the completion.',
        type: 'slider',
        min: 0,
        max: 32768,
        default: 2048,
        step: 1,
      },
      {
        key: 'messageHistorySize',
        name: 'Max History Message Size',
        description: 'The number of retained historical messages will be truncated if the length of the message exceeds the MaxToken parameter.',
        type: 'slider',
        min: 1,
        max: 24,
        default: 5,
        step: 1,
      },
    ],
    bots: [
      {
        id: 'chat_continuous',
        type: 'chat_continuous',
        name: 'Continuous Chat',
        settings: [],
      },
      {
        id: 'chat_single',
        type: 'chat_single',
        name: 'Single Chat',
        settings: [],
      },

    ],
    handlePrompt,
    handleRapidPrompt,
  }
  return provider
}

export default providerGoogle
