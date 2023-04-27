import { showConversationEditModal } from '@/stores/ui'
import ConversationEdit from '../conversations/ConversationEdit'
import type { Conversation } from '@/types/conversation'

interface Props {
  conversation: Conversation
}

export default (props: Props) => {
  return (
    <div class="h-full py-16 overflow-auto px-12 sm:px-18">
      <div class="max-w-xl mx-auto">
        <div onClick={() => showConversationEditModal.set(true)}>open settings</div>
      </div>
    </div>
  )
}
