import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { useI18n } from '@/hooks'
import { conversationMapSortList } from '@/stores/conversation'
import ConversationSidebarItem from './ConversationSidebarItem'
import ConversationSidebarAdd from './ConversationSidebarAdd'

export default () => {
  const { t } = useI18n()
  const $conversationMapSortList = useStore(conversationMapSortList)

  return (
    <div class="h-full flex flex-col bg-sidebar">
      <header class="h-14 fi justify-between px-4 text-xs uppercase">
        <p class="px-2">{t('conversations.title')}</p>
        <div class="fi gap-1">
          {/* <Button
            icon="i-carbon-search"
            onClick={() => {}}
            size="sm"
          /> */}
          <ConversationSidebarAdd />
        </div>
      </header>
      <div class="flex-1 overflow-auto">
        <div class="px-2">
          <For each={$conversationMapSortList()}>
            {instance => (
              <ConversationSidebarItem instance={instance} />
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
