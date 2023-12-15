export interface GoogleFetchPayload {
    apiKey: string
    body: Record<string, any>
}

export const fetchChatCompletion = async(payload: GoogleFetchPayload) => {
    const { apiKey, body } = payload || {}
    const initOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ ...body }),
    }
    return fetch(`https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${apiKey}`, initOptions);
}