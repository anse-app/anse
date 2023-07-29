import { createParser } from 'eventsource-parser'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'

export const parseStream = (rawResponse: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const rb = rawResponse.body as ReadableStream

  return new ReadableStream({
    async start(controller) {
      const streamParser = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const contentDelta = json.choices[0].delta
            if (!contentDelta)
              controller.error(new Error('No content delta'))
            if (contentDelta.function_call) {
              // if (contentDelta.function_call.name)
              //   functionCallPayload.name = contentDelta.function_call.name
              // if (contentDelta.function_call.arguments)
              //   functionCallPayload.argumentsRaw += contentDelta.function_call.arguments.replace(/\n/g, '')
              const queue = encoder.encode(`function:${JSON.stringify(contentDelta.function_call)}}`)
              controller.enqueue(queue)
            } else {
              const queue = encoder.encode(contentDelta.content || '')
              controller.enqueue(queue)
            }
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
        parser.feed(decoder.decode(value))
      }
    },
  })
}
