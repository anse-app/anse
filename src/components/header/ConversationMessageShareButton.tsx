import { useStore } from '@nanostores/solid'
import { currentConversationId } from '@/stores/conversation'
import { showShareModal } from '@/stores/ui'

export default () => {
  const $currentConversationId = useStore(currentConversationId)

  return (
    <>
      {$currentConversationId() && (
        <div
          class="fcc p-2 rounded-md text-xl hv-foreground"
          onClick={() => { showShareModal.set(true) }}
        >
          <div i-carbon-export />
        </div>
      )}
    </>
  )
}
