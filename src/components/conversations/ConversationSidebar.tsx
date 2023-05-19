import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { useI18n } from '@/hooks'
import { conversationMapSortList } from '@/stores/conversation'
import logo from '@/assets/logo.svg'
import ConversationSidebarItem from './ConversationSidebarItem'
import ConversationSidebarAdd from './ConversationSidebarAdd'

export default () => {
  const { t } = useI18n()
  const $conversationMapSortList = useStore(conversationMapSortList)

  return (
    <div class="h-full flex flex-col bg-sidebar">
      <header class="fi gap-1.5 h-14 px-6">
        <img src={logo} alt="logo" class="w-4" />
      </header>
      <div class="flex-1 overflow-auto">
        <For each={$conversationMapSortList()}>
          {instance => (
            <ConversationSidebarItem instance={instance} />
          )}
        </For>
        <ConversationSidebarAdd />
      </div>
    </div>
  )
}
