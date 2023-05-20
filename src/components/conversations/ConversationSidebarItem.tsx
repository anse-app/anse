import { useStore } from '@nanostores/solid'
import { currentConversationId, deleteConversationById } from '@/stores/conversation'
import { showConversationSidebar } from '@/stores/ui'
import { useI18n } from '@/hooks'
import type { Conversation } from '@/types/conversation'

interface Props {
  instance: Omit<Conversation, 'messages'> & {
    current?: boolean
  }
}

export default ({ instance }: Props) => {
  const { t } = useI18n()
  const $currentConversationId = useStore(currentConversationId)
  const isTouchDevice = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0

  const handleClick = () => {
    currentConversationId.set(instance.id)
    showConversationSidebar.set(false)
  }
  const handleDelete = (e: MouseEvent, conversationId: string) => {
    e.stopPropagation()
    currentConversationId.set('')
    deleteConversationById(conversationId)
  }

  return (
    <div
      class={[
        'group fi h-10 my-0.5 px-2 gap-2 hv-base rounded-md',
        instance.id === $currentConversationId() ? 'bg-base-200' : '',
      ].join(' ')}
      onClick={handleClick}
    >
      <div class="fcc w-8 h-8 rounded-full text-xl shrink-0">
        {instance.icon ? instance.icon : <div class="text-base i-carbon-chat" />}
      </div>
      <div class="flex-1 truncate text-sm">{ instance.name || t('conversations.untitled') }</div>
      <div class={isTouchDevice ? '' : 'hidden group-hover:block'}>
        <div
          class="inline-flex p-2 items-center gap-1 rounded-md hv-base"
          onClick={e => handleDelete(e, instance.id)}
        >
          <div class="i-carbon-close" />
        </div>
      </div>
    </div>
  )
}
