import { useStore } from '@nanostores/solid'
import { currentConversationId } from '@/stores/conversation'
import { showShareModal } from '@/stores/ui'
import { getMessagesByConversationId, updateMessage } from '@/stores/messages'

export default () => {
  const $currentConversationId = useStore(currentConversationId)
  const handleShareContext = () => {
    const messages = getMessagesByConversationId($currentConversationId())
    messages.forEach((message) => {
      updateMessage($currentConversationId(), message.id, { isSelected: true },
      )
    })
    showShareModal.set(true)
  }

  return (
    <>
      {$currentConversationId() && (
        <div
          class="fcc p-2 rounded-md text-xl hv-foreground"
          onClick={() => { handleShareContext() }}
        >
          <div i-carbon-export />
        </div>
      )}
    </>
  )
}
