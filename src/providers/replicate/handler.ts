import { fetchImageGeneration } from './api'
import type { HandlerPayload, Provider } from '@/types/provider'
import type { Message } from '@/types/message'

export const handlePrompt: Provider['handlePrompt'] = async(payload, signal?: AbortSignal) => {
  if (payload.botId === 'stable-diffusion')
    return handleStableDiffusion(payload)
}

const handleStableDiffusion = async(payload: HandlerPayload) => {
  const prompt = payload.prompt
  const response = await fetchImageGeneration({
    token: payload.globalSettings.token as string,
    method: 'POST',
    body: {
      version: payload.globalSettings.version as string,
      input: {
        prompt,
      },
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

  return waitImageWithPrediction(resJson, payload.globalSettings.token as string)
}

interface Prediction {
  id: string
  input: {
    prompt: string
  }
  output: string[] | null
  status: 'starting' | 'succeeded' | 'failed'
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const waitImageWithPrediction = async(prediction: Prediction, token: string) => {
  let currentPrediction = prediction
  while (currentPrediction.status !== 'succeeded' && currentPrediction.status !== 'failed') {
    await sleep(1000)
    const response = await fetchImageGeneration({
      predictionId: currentPrediction.id,
      token,
    })
    if (!response.ok) {
      const responseJson = await response.json()
      const errMessage = responseJson.error?.message || 'Unknown error'
      throw new Error(errMessage)
    }
    prediction = await response.json()
    currentPrediction = prediction
    // console.log('currentPrediction', prediction)
  }
  if (!currentPrediction.output || currentPrediction.output.length === 0)
    throw new Error('No output')
  return currentPrediction.output[0]
}
