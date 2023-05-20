import { useStore } from '@nanostores/solid'
import { useI18n } from '@/hooks'
import { currentConversation, updateConversationById } from '@/stores/conversation'
import { showConversationEditModal } from '@/stores/ui'
import ConversationEdit from './ConversationEdit'
import type { Conversation } from '@/types/conversation'

export default () => {
  const { t } = useI18n()
  const $currentConversation = useStore(currentConversation)
  let modifiedConversationPayload: Partial<Conversation> = {}

  const handleButtonClick = () => {
    if (Object.keys(modifiedConversationPayload).length)
      updateConversationById($currentConversation()!.id, modifiedConversationPayload)
    showConversationEditModal.set(false)
  }

  const handleChange = (payload: Partial<Conversation>) => {
    modifiedConversationPayload = {
      ...modifiedConversationPayload,
      ...payload,
    }
  }

  return (
    <div class="p-6">
      <main class="flex flex-col gap-3 mt-3">
        <ConversationEdit
          conversation={$currentConversation()!}
          handleChange={handleChange}
        />
      </main>
      <div class="fcc px-2 py-2 bg-darker border border-base mt-4 hv-base hover:border-base-100" onClick={handleButtonClick}>{t('settings.save')}</div>
    </div>
  )
}
