import { showConversationEditModal } from '@/stores/ui'
import { getBotMetaById } from '@/stores/provider'
import Button from '../ui/Button'
import type { Conversation } from '@/types/conversation'

interface Props {
  conversation: Conversation
}

export default (props: Props) => {
  const botMeta = () => getBotMetaById(props.conversation.bot) || null
  return (
    <div class="fi flex-col h-full px-6 py-8 overflow-auto">
      <Button
        icon="i-carbon-settings-adjust text-sm"
        onClick={() => showConversationEditModal.set(true)}
        size="sm"
        variant="ghost"
      >
        <div class="inline-flex items-center gap-1">
          {botMeta().provider.name} / {botMeta().label}
          {props.conversation.systemInfo && (
            <div class="text-xs px-1 border border-base-100 rounded-md op-40">System Info</div>
          )}
        </div>
      </Button>
    </div>
  )
}
