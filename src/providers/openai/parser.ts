import type { Response } from 'node-fetch'

/**
 * Function to parse the stream response from OpenAI API
 * @param rawResponse The raw response object from the fetch request
 * @returns A readable stream to handle the parsed data
 */
export const parseStream = async(rawResponse: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const rb = rawResponse.body as ReadableStream

  return new ReadableStream({
    async start(controller) {
      const streamParser = (event: any) => {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }
      const reader = rb.getReader()
      const parser = createParser(streamParser)
      let done = false
      while (!done) {
        const { done: isDone, value } = await reader.read()
        if (isDone) {
          done = true
          controller.close()
          return
        }
        parser.feed(decoder.decode(value, { stream: true }) as string)
      }
    },
  })
}

/**
 * Creates a parser for stream events
 * @param streamParser Function to handle stream events
 * @returns A parser object with a feed method
 */
function createParser(streamParser: (event: any) => void) {
  return {
    feed: streamParser, // Returning an object with the feed method
  }
}
