import { useStore } from '@nanostores/solid'
import { For } from 'solid-js'
import { useClipboardCopy, useI18n } from '@/hooks'
import { currentConversationId } from '@/stores/conversation'
import { getMessagesByConversationId } from '@/stores/messages'
import { Tabs } from '../ui/base'
import type { TabItem } from './base/Tabs'

export default () => {
  const { t } = useI18n()
  const $currentConversationId = useStore(currentConversationId)
  const messages = getMessagesByConversationId($currentConversationId())

  console.log($currentConversationId(), messages)

  const [copied, copy] = useClipboardCopy(messages.map(item => `${item.role}: ${item.content}`).join('\n'))

  const tabs: TabItem[] = [
    {
      value: 'context',
      label: t('conversations.share.tabs.context'),
      content: <div class="flex flex-col gap-2">
        <div class="emerald-light-button mt-0 cursor-pointer" onClick={() => copy()}>{copied() ? t('copyed') : t('conversations.share.copy')}</div>
        <For each={messages}>
          {item => (
            <div class="flex space-x-2">
              <div class="font-bold w-20 text-left">{item.role}:</div>
              <div class="text-left flex-1 whitespace-normal overflow-auto">{item.content}</div>
            </div>
          )}
        </For>
      </div>,
    },
    {
      value: 'image',
      label: t('conversations.share.tabs.image'),
      content: <div class="flex">image</div>,
    },
  ]

  return (
    <div class="w-full">
      <div class="fi justify-between border-base b-b-1 px-6 py-4">
        <div class="text-base">{t('conversations.share.link.title')}</div>
        <button class="button mt-0">{t('conversations.share.link.create')}</button>
      </div>
      <div class="fcc flex-col space-y-2 p-6">
        <div class="border w-full border-base fi justify-between box-border p-4 rounded-md hv-base">
          <span class="text-xs">{t('conversations.share.messages.selected')}</span>
          <span class="text-xs op-60">2 Messages</span>
        </div>
        <Tabs tabs={tabs} sticky tabClass="bg-base-100" />
      </div>
    </div>
  )
}
