import { useI18n } from '@/hooks'
import { Tabs } from '../ui/base'
import type { TabItem } from './base/Tabs'

export default () => {
  const { t } = useI18n()

  const tabs: TabItem[] = [
    {
      value: 'context',
      label: t('conversations.share.tabs.context'),
      content: <div class="flex">context</div>,
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
        <button class="emerald-button mt-0">{t('conversations.share.link.create')}</button>
      </div>
      <div class="fcc flex-col space-y-2 p-6">
        <div class="border w-full border-base fi justify-between box-border p-4 rounded-md hv-base">
          <span class="text-xs">{t('conversations.share.messages.selected')}</span>
          <span class="text-xs op-60">2 Messages</span>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}
