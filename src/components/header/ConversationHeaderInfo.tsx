import { Show } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { conversationMap, currentConversationId } from '@/stores/conversation'

export default () => {
  const $conversationMap = useStore(conversationMap)
  const $currentConversationId = useStore(currentConversationId)
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }

  return (
    <div class="fi gap-1 max-w-40vw px-2 overflow-hidden text-sm">
      <Show when={currentConversation()}>
        <Show when={currentConversation().icon}>
          <div class="fcc w-8 h-8 rounded-full text-xl shrink-0 hidden md:flex">{currentConversation().icon}</div>
        </Show>
        <div class="truncate">
          {currentConversation() ? (currentConversation().name || 'Untitled') : ''}
        </div>
      </Show>
    </div>
  )
}
