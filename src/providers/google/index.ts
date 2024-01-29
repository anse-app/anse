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
        default: 10240,
        step: 1,
      },
      {
        key: 'maxOutputTokens',
        name: 'Max Output Tokens',
        description: 'Specifies the maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.',
        type: 'slider',
        min: 0,
        max: 4096,
        default: 1024,
        step: 1,
      },
      {
        key: 'temperature',
        name: 'Temperature',
        description: 'The temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a more deterministic or less open-ended response.',
        type: 'slider',
        min: 0,
        max: 1,
        default: 0.4,
        step: 0.01,
      },
      {
        key: 'topP',
        name: 'Top P',
        description: 'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.',
        type: 'slider',
        min: 0,
        max: 1,
        default: 0.95,
        step: 0.01,
      },
      {
        key: 'topK',
        name: 'Top K',
        description: 'Top K sampling chooses from the K most likely tokens.',
        type: 'slider',
        min: 0,
        max: 32768,
        default: 1,
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
