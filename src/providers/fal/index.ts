import { handlePrompt } from './handler'
import type { Provider } from '@/types/provider'

const providerFal = () => {
  const provider: Provider = {
    id: 'provider-fal',
    icon: 'i-carbon-flash-filled', // @unocss-include
    name: 'Fal.ai',
    href: 'https://www.fal.ai/dashboard/keys',
    models: [],
    globalSettings: [
      {
        key: 'token',
        name: 'API token: (key_id:key_secret)',
        type: 'api-key',
      },
    ],
    bots: [
      {
        id: 'stable-diffusion-with-LoRAs',
        type: 'image_generation',
        name: 'Stable Diffusion with LoRAs',
        settings: [],
      },
      {
        id: 'stable-diffusion-xl',
        type: 'image_generation',
        name: 'Stable Diffusion XL',
        settings: [],
      },
      {
        id: 'fooocus',
        type: 'image_generation',
        name: 'Fooocus',
        settings: [],
      },
    ],
    supportCallMethod: 'backend',
    handlePrompt,
  }
  return provider
}

export default providerFal
