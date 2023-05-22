import { useStore } from '@nanostores/solid'
import { currentConversationId } from '@/stores/conversation'

export default () => {
  const $currentConversationId = useStore(currentConversationId)

  const handleClearMessage = () => {
  }

  return (
    <>
      {$currentConversationId() && (
        <div
          class="fcc p-2 rounded-md text-xl hv-foreground"
          onClick={handleClearMessage}
        >
          <div i-carbon-export />
        </div>
      )}
    </>
  )
}
