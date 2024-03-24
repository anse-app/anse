import { fetchImageGeneration } from './api'
import type { HandlerPayload, Provider } from '@/types/provider'

export const handlePrompt: Provider['handlePrompt'] = async(payload, signal?: AbortSignal) => {
  if (payload.botId === 'stable-diffusion')
    return handleReplicateGenerate('ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4', payload)
  if (payload.botId === 'stable-diffusion-v1')
    return handleReplicateGenerate('b3d14e1cd1f9470bbb0bb68cac48e5f483e5be309551992cc33dc30654a82bb7', payload)
  if (payload.botId === 'waifu-diffusion')
    return handleReplicateGenerate('25d2f75ecda0c0bed34c806b7b70319a53a1bccad3ade1a7496524f013f48983', payload)
  if (payload.botId === 'sdxl')
    return handleReplicateGenerate('2a865c9a94c9992b6689365b75db2d678d5022505ed3f63a5f53929a31a46947', payload)
}

const handleReplicateGenerate = async(modelVersion: string, payload: HandlerPayload) => {
  const prompt = payload.prompt
  const response = await fetchImageGeneration({
    token: payload.globalSettings.token as string,
    method: 'POST',
    body: {
      version: modelVersion,
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
