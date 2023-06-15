import { useStore } from '@nanostores/solid'
import { For, createSignal } from 'solid-js'
import { useI18n } from '@/hooks'
import { currentConversationId } from '@/stores/conversation'
import { getMessagesByConversationId, updateMessage } from '@/stores/messages'
import { showSelectMessageModal, showShareModal } from '@/stores/ui'
import { Checkbox } from '../ui/base'

export default () => {
  const { t } = useI18n()
  const $currentConversationId = useStore(currentConversationId)
  const messages = getMessagesByConversationId($currentConversationId())
  const [checkAll, setCheckAll] = createSignal(messages.every(item => item.isSelected))
  const [selectedMessages, setSelectedMessages] = createSignal(messages)

  const handleToggleMessages = (id: string) => {
    messages.forEach((item) => {
      if (item.id === id)
        item.isSelected = !item.isSelected
    })
    setSelectedMessages(messages)
  }

  const handleSelectAll = () => {
    messages.forEach((item) => {
      item.isSelected = !checkAll()
    })
    setSelectedMessages(messages)
    setCheckAll(!checkAll())
    console.log(selectedMessages(), checkAll())
  }

  const handleSaveContext = () => {
    messages.forEach((item) => {
      updateMessage($currentConversationId(), item.id, { isSelected: item.isSelected })
    })
    showSelectMessageModal.set(false)
    showShareModal.set(true)
  }

  return (
    <div class="w-full">
      <div class="fi px-6 py-4 border-base b-b-1">
        <div class="text-base">{t('conversations.share.messages.title')}</div>
      </div>
      <div class="flex flex-col p-6 h-100 overflow-auto relative">
        {/* <div class="border border-base b-b-0 last:b-b-1 p-4 hv-base">
          <Checkbox setValue={() => handleSelectAll()} initValue={checkAll()} label={`${t('conversations.share.messages.selectAll')}`} />
        </div> */}
        <For each={selectedMessages()}>
          {(item) => {
            return (
              <div class="border border-base b-b-0 last:b-b-1 p-4 hv-base">
                <Checkbox setValue={() => handleToggleMessages(item.id)} initValue={item.isSelected} label={`${item.role}: ${item.content}`} />
              </div>
            )
          }}
        </For>
      </div>
      <div class="fcc px-2 py-2 bg-darker border border-base hv-base hover:border-base-100" onClick={() => handleSaveContext()}>{t('settings.save')}</div>
    </div>
  )
}
