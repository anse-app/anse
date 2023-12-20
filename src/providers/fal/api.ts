interface FetchPayload {
  method?: 'POST' | 'GET'
  token: string
  predictionId: string
  body?: Record<string, any>
}

export const fetchImageGeneration = async(payload: FetchPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Key ${payload.token}`,
    },
    method: payload.method || 'GET',
    body: payload.method === 'POST' ? JSON.stringify(payload.body || {}) : undefined,
  }
  const fetchUrl = `https://${payload.predictionId}.gateway.alpha.fal.ai`
  return fetch(fetchUrl, initOptions)
}
