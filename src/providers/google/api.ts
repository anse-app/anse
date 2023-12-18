export interface GoogleFetchPayload {
    apiKey: string
    body: Record<string, any>
    model?: string
}

export const fetchChatCompletion = async(payload: GoogleFetchPayload) => {
    const { apiKey, body, model } = payload || {}
    const initOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ ...body }),
    }
    return fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`, initOptions);
}