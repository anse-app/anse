import {
  handlePrompt as handleOpenAIPrompt,
  handleRapidPrompt as handleOpenAIRapidPrompt,
} from './handler'
import type { Provider } from '@/types/provider'

const providerOpenAI = (): Provider => {
  const provider: Provider = {
    id: 'provider-openai',
    icon: 'i-simple-icons-openai', // @unocss-include
    name: 'OpenAI',
    globalSettings: [
      {
        key: 'apiKey',
        name: 'API Key',
        type: 'api-key',
      },
      {
        key: 'baseUrl',
        name: 'Base URL',
        description: 'Custom base url for OpenAI API.',
        type: 'input',
        default: 'https://api.openai.com',
      },
      {
        key: 'model',
        name: 'OpenAI model',
        description: 'Custom gpt model for OpenAI API.',
        type: 'select',
        options: [
          { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' },
          { value: 'gpt-4', label: 'gpt-4' },
          // Adicione aqui outras opções de modelos da OpenAI, se necessário
        ],
        default: 'gpt-3.5-turbo',
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
      // Adicione aqui outras configurações globais necessárias para os modelos da OpenAI
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
      {
        id: 'image_generation',
        type: 'image_generation',
        name: 'DALL·E',
        settings: [],
      },
      // Adicione aqui outros tipos de bots relacionados aos modelos da OpenAI, se necessário
    ],
    handlePrompt: handleOpenAIPrompt,
    handleRapidPrompt: handleOpenAIRapidPrompt,
  }
  return provider
}

export default providerOpenAI
