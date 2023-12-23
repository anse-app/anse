import {
  handlePrompt,
  handleRapidPrompt,
} from './handler'
import Models from './models.json'
import type { Provider } from '@/types/provider'

const models = Models.data.map(m => ({ value: m.id, label: `${m.name}${m.pricing.prompt === '0' ? '[free]' : ''}` }))

const providerOpenRouter = () => {
  const provider: Provider = {
    id: 'provider-openrouter',
    icon: 'i-simple-icons-alwaysdata', // @unocss-include https://icones.js.org/
    name: 'OpenRouter',
    href: 'https://openrouter.ai/keys',
    models,
    globalSettings: [
      {
        key: 'apiKey',
        name: 'API Key',
        type: 'api-key',
      },
      {
        key: 'model',
        name: 'OpenRouter model',
        description: 'Custom gpt model for OpenRouter API.',
        type: 'select',
        options: models,
        default: 'openrouter/auto',
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
      {
        key: 'temperature',
        name: 'Temperature',
        type: 'slider',
        description: 'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.',
        min: 0,
        max: 2,
        default: 0.7,
        step: 0.01,
      },
      {
        key: 'top_p',
        name: 'Top P',
        description: 'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.',
        type: 'slider',
        min: 0,
        max: 1,
        default: 1,
        step: 0.01,
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

export default providerOpenRouter
