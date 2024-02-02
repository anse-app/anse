import destr from 'destr'
import { getBotMetaById, getProviderById } from '@/stores/provider'
import { updateConversationById } from '@/stores/conversation'
import { clearMessagesByConversationId, getMessagesByConversationId, pushMessageByConversationId } from '@/stores/messages'
import { getGeneralSettings, getSettingsByProviderId } from '@/stores/settings'
import { setLoadingStateByConversationId, setStreamByConversationId } from '@/stores/streams'
import { currentErrorMessage } from '@/stores/ui'
import { generateRapidProviderPayload, promptHelper } from './helper'
import type { HandlerPayload, PromptResponse } from '@/types/provider'
import type { Conversation } from '@/types/conversation'
import type { ErrorMessage, Message } from '@/types/message'

export const handlePrompt = async(conversation: Conversation, prompt?: string, signal?: AbortSignal) => {
  const generalSettings = getGeneralSettings()
  const bot = getBotMetaById(conversation.bot)
  const [providerId, botId] = conversation.bot.split(':')
  const provider = getProviderById(providerId)
  if (!provider) return
  // TODO: 只在传给服务端时转换
  let callMethod = generalSettings.requestWithBackend ? 'backend' : 'frontend' as 'frontend' | 'backend'
  if (provider.supportCallMethod === 'frontend' || provider.supportCallMethod === 'backend')
    callMethod = provider.supportCallMethod

  // if (bot.type !== 'chat_continuous')
  //   clearMessagesByConversationId(conversation.id)
  if (prompt) {
    pushMessageByConversationId(conversation.id, {
      id: `${conversation.id}:user:${Date.now()}`,
      role: 'user',
      content: prompt,
      dateTime: new Date().getTime(),
      isSelected: false,
    })
  }

  setLoadingStateByConversationId(conversation.id, true)
  let providerResponse: PromptResponse
  const messages = [
    ...(conversation.systemInfo ? [{ role: 'system', content: conversation.systemInfo }] : []) as Message[],
    ...(destr(conversation.mockMessages) || []) as Message[],
    ...getMessagesByConversationId(conversation.id).map(message => ({
      role: message.role,
      content: message.content,
    })),
  ]

  console.log(messages)

  // if (bot.type !== 'chat_continuous')
  //   clearMessagesByConversationId(conversation.id)
  if (prompt && (conversation.model || '').includes('vision') && prompt.indexOf('![](') === 0) {
    // 提取图片
    let text = ''
    let url = ''
    prompt.replace(/!\[\]\(([^\\]+)\) (.*)/g, (_, $1, $2) => {
      text = $2
      url = $1
      return ''
    })
    messages[messages.length - 1] = {
      role: 'user',
      // @ts-expect-error
      content: [
        { type: 'text', text },
        {
          type: 'image_url',
          image_url: {
            url,
            detail: 'auto',
          },
        },
      ],
    }
  }

  const handlerPayload: HandlerPayload = {
    conversationId: conversation.id,
    conversationType: bot.type,
    botId,
    model: conversation.model,
    globalSettings: getSettingsByProviderId(provider.id),
    botSettings: {},
    prompt,
    messages: bot.type === 'chat_single' ? messages.slice(-1) : messages,
  }
  try {
    providerResponse = await getProviderResponse(provider.id, handlerPayload, {
      caller: callMethod,
      signal,
    })
  } catch (e) {
    const error = e as Error
    const cause = error?.cause as ErrorMessage
    setLoadingStateByConversationId(conversation.id, false)
    if (error.name !== 'AbortError') {
      currentErrorMessage.set({
        code: cause?.code || 'provider_error',
        message: cause?.message || error.message || 'Unknown error',
      })
    }
  }

  if (providerResponse) {
    const messageId = `${conversation.id}:assistant:${Date.now()}`
    if (providerResponse instanceof ReadableStream) {
      setStreamByConversationId(conversation.id, {
        messageId,
        stream: providerResponse,
      })
    }
    pushMessageByConversationId(conversation.id, {
      id: messageId,
      role: 'assistant',
      content: typeof providerResponse === 'string' ? providerResponse : '',
      stream: providerResponse instanceof ReadableStream,
      dateTime: new Date().getTime(),
      isSelected: false,
    })
  }
  setLoadingStateByConversationId(conversation.id, false)

  // Update conversation title
  if (providerResponse && bot.type === 'chat_continuous' && !conversation.name) {
    const inputText = conversation.systemInfo || prompt!
    const rapidPayload = generateRapidProviderPayload(promptHelper.summarizeText(inputText), provider.id)
    const generatedTitle = await getProviderResponse(provider.id, rapidPayload, { caller: callMethod }).catch(() => {}) as string || inputText
    updateConversationById(conversation.id, {
      name: generatedTitle.replace(/^['"\s]+|['"\s]+$/g, ''),
    })
  }
}

const getProviderResponse = async(providerId: string, payload: HandlerPayload, options?: {
  caller: 'frontend' | 'backend'
  signal?: AbortSignal
}) => {
  if (options?.caller === 'frontend') {
    return callProviderHandler(providerId, payload, options.signal)
  } else {
    const backendResponse = await fetch(`/api/handle/${providerId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      signal: options?.signal,
    })
    if (!backendResponse.ok) {
      const error = await backendResponse.json()
      throw new Error('Request failed', {
        cause: error?.error,
      })
    }
    if (backendResponse.headers.get('content-type')?.includes('text/plain'))
      return backendResponse.text()
    else
      return backendResponse.body
  }
}

// Called by both client and server
export const callProviderHandler = async(providerId: string, payload: HandlerPayload, signal?: AbortSignal) => {
  // To filter out sensitive fields, such as `apiKey` and `prompt`
  console.log('callProviderHandler', {
    conversationId: payload.conversationId,
    conversationType: payload.conversationType,
    botId: payload.botId,
    model: payload.model,
    globalSettings: {
      baseUrl: payload.globalSettings?.baseUrl,
      model: payload.model || payload.globalSettings?.model,
      maxTokens: payload.globalSettings?.maxTokens,
      maxOutputTokens: payload.globalSettings?.maxOutputTokens,
      temperature: payload.globalSettings?.temperature,
      topP: payload.globalSettings?.topP,
      topK: payload.globalSettings?.topK,
    },
    botSettings: payload.botSettings,
  })

  const provider = getProviderById(providerId)
  if (!provider) return

  let response: PromptResponse
  if (payload.botId === 'temp')
    response = await provider.handleRapidPrompt?.(payload.prompt!, payload.globalSettings)
  else
    response = await provider.handlePrompt?.(payload, signal)

  return response
}
