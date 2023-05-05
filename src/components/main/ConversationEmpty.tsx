import { showConversationEditModal } from '@/stores/ui'
import { getBotMetaById } from '@/stores/provider'
import type { Conversation } from '@/types/conversation'

interface Props {
  conversation: Conversation
}

export default (props: Props) => {
  const botMeta = () => getBotMetaById(props.conversation.bot) || null
  return (
    <div class="fi flex-col h-full py-4 overflow-auto px-6">
      <div
        class="inline-flex items-center gap-1 button"
        onClick={() => showConversationEditModal.set(true)}
      >
        <div i-carbon-settings-adjust />
        {botMeta().provider.name} / {botMeta().label}
        {props.conversation.systemInfo && (
          <div class="text-xs px-1 border border-darker rounded-md op-40">System Info</div>
        )}
      </div>
    </div>
  )
}
