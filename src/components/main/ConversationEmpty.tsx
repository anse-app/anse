import { For, Show, createResource } from 'solid-js'
import { showConversationEditModal } from '@/stores/ui'
import { getBotMetaById } from '@/stores/provider'
import { handlePrompt } from '@/logics/conversation'
import Button from '../ui/Button'
import type { Conversation } from '@/types/conversation'

const fetchPromptStore = async() => {
  const { data } = await fetch('https://store.anse.app/api/list').then(res => res.json())
  return data as ExamplePrompt[]
}

interface ExamplePrompt {
  title: string
  content: string
}

interface Props {
  conversation: Conversation
}

export default (props: Props) => {
  const [examplePrompts] = createResource(fetchPromptStore)
  const botMeta = () => getBotMetaById(props.conversation.bot) || null

  const handleExamplePromptClick = (prompt: ExamplePrompt) => {
    handlePrompt(props.conversation, prompt.content)
  }
  const handleOpenStoreClick = () => {
    window.open('https://store.anse.app/')
  }

  return (
    <div class="fi flex-col gap-6 h-full px-6 py-8 overflow-auto">
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
      <Show when={examplePrompts()}>
        <div class="w-full max-w-md mx-12 px-4 py-3 sm:mx-18 border border-base rounded-lg">
          <h3 class="flex items-center gap-1 text-sm op-50">
            <div class="i-carbon:idea font-semibold" />
            <div class="flex-1">Examples</div>
            <div
              class="fcc p-2 rounded-md hv-foreground"
              onClick={handleOpenStoreClick}
            >
              <div i-carbon-arrow-up-right />
            </div>
          </h3>
          <div class="flex flex-col gap-1 mt-1">
            <For each={examplePrompts()}>
              {prompt => (
                <div class="-mx-1 px-2 py-2 hv-base rounded-md" onClick={() => handleExamplePromptClick(prompt)}>
                  <div class="text-sm font-semibold">{prompt.title}</div>
                  <div class="mt-1 text-xs line-clamp-2 op-60">{prompt.content}</div>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  )
}
