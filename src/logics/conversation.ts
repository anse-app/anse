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
  let callMethod = generalSettings.requestWithBackend ? 'backend' : 'frontend' as 'frontend' | 'backend'
  if (provider.supportCallMethod === 'frontend' || provider.supportCallMethod === 'backend')
    callMethod = provider.supportCallMethod

  if (bot.type !== 'chat_continuous')
    clearMessagesByConversationId(conversation.id)
  if (prompt) {
    pushMessageByConversationId(conversation.id, {
      id: `${conversation.id}:user:${Date.now()}`,
      role: 'user',
      content: prompt,
      dateTime: new Date().getTime(),
    })
  }

  setLoadingStateByConversationId(conversation.id, true)
  let providerResponse: PromptResponse
  const handlerPayload: HandlerPayload = {
    conversationId: conversation.id,
    conversationType: bot.type,
    botId,
    globalSettings: getSettingsByProviderId(provider.id),
    botSettings: {},
    prompt,
    messages: [
      ...(conversation.systemInfo ? [{ role: 'system', content: conversation.systemInfo }] : []) as Message[],
      ...(destr(conversation.mockMessages) || []) as Message[],
      ...getMessagesByConversationId(conversation.id).map(message => ({
        role: message.role,
        content: message.content,
      })),
    ],
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
    })
  }
  setLoadingStateByConversationId(conversation.id, false)

  // Update conversation title
  if (providerResponse && bot.type === 'chat_continuous' && !conversation.name) {
    const inputText = conversation.systemInfo || prompt!
    const rapidPayload = generateRapidProviderPayload(promptHelper.summarizeText(inputText), provider.id)
    const generatedTitle = await getProviderResponse(provider.id, rapidPayload).catch(() => {}) as string || inputText
    updateConversationById(conversation.id, {
      name: generatedTitle,
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
  console.log('callProviderHandler', payload)

  const provider = getProviderById(providerId)
  if (!provider) return

  let response: PromptResponse
  if (payload.botId === 'temp')
    response = await provider.handleRapidPrompt?.(payload.prompt!, payload.globalSettings)
  else
    response = await provider.handlePrompt?.(payload, signal)

  return response
}
