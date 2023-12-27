import { useStore } from '@nanostores/solid'
import { showConversationEditModal } from '@/stores/ui'
import { currentConversationId } from '@/stores/conversation'

export default () => {
  // Retrieve the current conversation ID from the store
  const $currentConversationId = useStore(currentConversationId)

  return (
    <>
      {/* Render the following code if the current conversation ID exists */}
      {$currentConversationId() && (
        <div
          class="fcc p-2 rounded-md text-xl hv-foreground"
          onClick={() => { showConversationEditModal.set(true) }}
        >
          {/* Render the carbon settings adjust icon */}
          <div i-carbon-settings-adjust />
        </div>
      )}
    </>
  )
}
