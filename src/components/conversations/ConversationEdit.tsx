import { Show, createSignal, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'
import BotSelect from '@/components/ui/BotSelect'
import { getBotMetaById } from '@/stores/provider'
import { emojiPickerCurrentPick, showEmojiPickerModal } from '@/stores/ui'
import type { Conversation } from '@/types/conversation'

interface Props {
  conversation: Conversation
  handleChange: (payload: Partial<Conversation>) => void
}

export default (props: Props) => {
  const [providerBot, setProviderBot] = createSignal(props.conversation.bot || '')
  const $emojiPickerCurrentPick = useStore(emojiPickerCurrentPick)
  const botMeta = () => getBotMetaById(providerBot()) || null

  onMount(() => {
    emojiPickerCurrentPick.set(undefined)
  })

  const handleProviderBotChange = (e: string) => {
    setProviderBot(e)
    const payload: Partial<Conversation> = { bot: e }
    if (botMeta()?.type === 'image_generation') {
      payload.systemInfo = undefined
      payload.mockMessages = undefined
    }
    props.handleChange(payload)
  }

  const handleOpenIconSelector = () => {
    // TODO: Icon selector by `emoji-mart`
    showEmojiPickerModal.set(true)
    emojiPickerCurrentPick.listen((emoji) => {
      props.handleChange({ icon: emoji })
    })
  }

  const handleOpenMockMessages = () => {
    // TODO
  }

  return (
    <div class="flex flex-col gap-4">
      <div
        class="fcc w-16 h-16 text-10 border border-base rounded-xl border-dashed hv-base"
        onClick={handleOpenIconSelector}
      >
        {$emojiPickerCurrentPick() || props.conversation.icon}
      </div>
      <input
        type="text"
        class="font-semibold mr-12 mb-3 px-1 truncate outline-0 bg-transparent placeholder:op-40"
        placeholder="Untitled"
        value={props.conversation.name}
        onBlur={e => props.handleChange({ name: e.currentTarget.value })}
      />
      <BotSelect value={props.conversation.bot} onChange={handleProviderBotChange} />
      <Show when={botMeta()?.type !== 'image_generation'}>
        <div class="py-1 border bg-base-50 border-base rounded-lg text-sm">
          <div class="px-4 py-2">
            <h3 class="op-80 shrink-0">System Info</h3>
            <textarea
              value={props.conversation.systemInfo || ''}
              rows="4"
              class="input-base mt-2 w-full"
              placeholder="You are a helpful assistant, answer as concisely as possible..."
              onBlur={e => props.handleChange({ systemInfo: e.currentTarget.value })}
            />
          </div>
          {/* <div class="fi justify-between gap-10 pl-4 pr-2 h-10">
            <h3 class="op-80 shrink-0">Mock Messages</h3>
            <div class="flex-1 fi justify-end overflow-hidden px-2 py-1 cursor-pointer" onClick={handleOpenMockMessages}>
              <p class="text-xs op-50 truncate">2 messages</p>
              <div i-carbon-chevron-right class="shrink-0" />
            </div>
          </div> */}
        </div>
      </Show>
    </div>
  )
}
