import { fetchImageGeneration } from './api'
import type { HandlerPayload, Provider } from '@/types/provider'

export const handlePrompt: Provider['handlePrompt'] = async(payload, signal?: AbortSignal) => {
  if (payload.botId === 'stable-diffusion-with-LoRAs')
    return handleFalGenerate('110602490-lora', 'stabilityai/stable-diffusion-xl-base-1.0', payload)
  if (payload.botId === 'stable-diffusion-xl')
    return handleFalGenerate('110602490-fast-sdxl', '', payload)
  if (payload.botId === 'fooocus')
    return handleFalGenerate('110602490-fooocus', '', payload)
}

const handleFalGenerate = async(predictionId: string, modelName: string, payload: HandlerPayload) => {
  const prompt = payload.prompt
  const response = await fetchImageGeneration({
    token: payload.globalSettings.token as string,
    method: 'POST',
    predictionId,
    body: {
      model_name: modelName,
      prompt,
    },
  })
  if (!response.ok) {
    const responseJson = await response.json()
    const errMessage = responseJson.detail || response.statusText || 'Unknown error'
    throw new Error(errMessage, {
      cause: {
        code: response.status,
        message: errMessage,
      },
    })
  }
  const resJson = await response.json()
  return resJson.images[0].url
}
