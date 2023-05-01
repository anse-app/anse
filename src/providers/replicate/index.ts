import { handlePrompt } from './handler'
import type { Provider } from '@/types/provider'

const providerReplicate = () => {
  const provider: Provider = {
    id: 'provider-replicate',
    icon: 'i-carbon-replicate', // @unocss-include
    name: 'Replicate',
    globalSettings: [
      {
        key: 'token',
        name: 'Replicate API token',
        type: 'api-key',
      },
      {
        key: 'version',
        name: 'Model Version',
        description: 'Version hash for Stable Diffusion.',
        type: 'input',
        default: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      },
    ],
    bots: [
      {
        id: 'stable-diffusion',
        type: 'image_generation',
        name: 'Stable Diffusion',
        settings: [],
      },
    ],
    supportCallMethod: 'backend',
    handlePrompt,
  }
  return provider
}

export default providerReplicate
