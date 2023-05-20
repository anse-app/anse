import { For, Show } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { useI18n } from '@/hooks'
import { addConversation, conversationMapSortList, currentConversationId } from '@/stores/conversation'

export default () => {
  const { t } = useI18n()
  const $conversationMapSortList = useStore(conversationMapSortList)

  return (
    <div class="fcc h-full">
      <div class="flex flex-col gap-4 w-full max-w-md mx-12 sm:mx-18 overflow-hidden">
        <div class="px-6 py-4 bg-base-100 border border-base rounded-lg">
          <h2 class="text-xs op-30 uppercase my-2">{t('conversations.recent')}</h2>
          <div class="flex flex-col items-start">
            <For each={$conversationMapSortList().slice(0, 3)}>
              {instance => (
                <div class="fi gap-2 h-8 max-w-full hv-foreground" onClick={() => currentConversationId.set(instance.id)}>
                  {instance.icon ? instance.icon : <div class="text-sm i-carbon-chat" />}
                  <div class="flex-1 text-sm truncate">{instance.name || t('conversations.untitled')}</div>
                </div>
              )}
            </For>
            <Show when={!$conversationMapSortList().length}>
              <div class="fi gap-2 h-8 text-sm op-20">{t('conversations.noRecent')}</div>
            </Show>
          </div>
        </div>
        <div
          class="fcc gap-2 p-6 bg-base-100 hv-base border border-base rounded-lg"
          onClick={() => addConversation()}
        >
          <div class="i-carbon-add" />
          <div class="flex-1 text-sm truncate">{t('conversations.add')}</div>
        </div>
      </div>
    </div>
  )
}
