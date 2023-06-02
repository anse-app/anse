import { useStore } from '@nanostores/solid'
import { For } from 'solid-js'
import { useI18n } from '@/hooks'
import { currentConversationId } from '@/stores/conversation'
import { getMessagesByConversationId } from '@/stores/messages'
import { Checkbox } from '../ui/base'

export default () => {
  const { t } = useI18n()
  const $currentConversationId = useStore(currentConversationId)
  const messages = getMessagesByConversationId($currentConversationId())

  console.log($currentConversationId(), messages)
  return (
    <div class="w-full">
      <div class="fi px-6 py-4 border-base b-b-1">
        <div class="text-base">{t('conversations.share.messages.title')}</div>
      </div>
      <div class="flex flex-col p-6 h-100 overflow-auto relative">
        <For each={messages}>
          {item => (
            <div class="border border-base b-b-0 last:b-b-1 p-4" >
              <Checkbox initValue label={`${item.role}: ${item.content}`} />
            </div>
          )}
        </For>
      </div>
      <div class="fcc px-2 py-2 bg-darker border border-base hv-base hover:border-base-100" >{t('settings.save')}</div>
    </div>
  )
}
