import { Match, Switch, createEffect } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMap, currentConversationId } from '@/stores/conversation'
import { conversationMessagesMap } from '@/stores/messages'
import { loadingStateMap, streamsMap } from '@/stores/streams'
import { getBotMetaById } from '@/stores/provider'
import { useI18n } from '@/hooks'
import ConversationEmpty from './ConversationEmpty'
import Welcome from './Welcome'
import Continuous from './Continuous'
import Single from './Single'
import Image from './Image'

export default () => {
  const { t } = useI18n()
  const $conversationMap = useStore(conversationMap)
  const $conversationMessagesMap = useStore(conversationMessagesMap)
  const $currentConversationId = useStore(currentConversationId)
  const $streamsMap = useStore(streamsMap)
  const $loadingStateMap = useStore(loadingStateMap)

  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }
  const currentBot = () => {
    return getBotMetaById(currentConversation()?.bot)
  }
  const currentConversationMessages = () => {
    return $conversationMessagesMap()[$currentConversationId()] || []
  }
  // const isStreaming = () => !!$streamsMap()[$currentConversationId()]
  // const isLoading = () => !!$loadingStateMap()[$currentConversationId()]

  createEffect(() => {
    const conversation = currentConversation()
    document.title = conversation ? `${(conversation.name || t('conversations.untitled'))} - Anse` : 'Anse'
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (link) {
      const conversationIcon = conversation?.icon ? `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${conversation.icon}</text></svg>` : null
      link.setAttribute('href', conversationIcon || '/logo.svg')
    }
  })

  return (
    <Switch
      fallback={(
        <Welcome />
      )}
    >
      <Match when={$currentConversationId() && !currentConversationMessages().length}>
        <ConversationEmpty conversation={currentConversation()} />
      </Match>
      <Match when={currentBot()?.type === 'chat_continuous'}>
        <Continuous
          conversationId={$currentConversationId()}
          messages={currentConversationMessages}
        />
      </Match>
      <Match when={currentBot()?.type === 'chat_single'}>
        <Single
          conversationId={$currentConversationId()}
          messages={currentConversationMessages}
        />
      </Match>
      <Match when={currentBot()?.type === 'image_generation'}>
        <Image
          // conversationId={$currentConversationId()}
          messages={currentConversationMessages}
          // fetching={isLoading() || !isStreaming()}
        />
      </Match>
    </Switch>
  )
}
