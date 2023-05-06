import { Suspense, createSignal } from 'solid-js'
import { EmojiPicker } from 'solid-emoji-picker'
import { emojiPickerCurrentPick, showEmojiPickerModal } from '@/stores/ui'
import type { Emoji } from 'solid-emoji-picker'
import '@/assets/emoji-picker.css'

export default () => {
  const [search, setSearch] = createSignal('')

  const emojiFilter = (emoji: Emoji) => {
    if (parseFloat(emoji.emoji_version) > 14)
      return false
    return emoji.name.includes(search())
  }

  const handleEmojiPick = (emoji: Emoji) => {
    emojiPickerCurrentPick.set(emoji.emoji)
    showEmojiPickerModal.set(false)
  }

  return (
    <div class="p-6">
      <div class="fi mr-12">
        <input
          type="text"
          class="w-full px-2 py-1 border border-base input-base  focus:border-darker"
          placeholder="Search an emoji."
          value={search()}
          onInput={(e) => {
            setSearch(e.currentTarget.value)
          }}
        />
      </div>
      <div class="mt-2 -mx-1 h-[16rem] overflow-auto">
        <Suspense fallback={<div class="mt-[8rem] mx-auto fcc text-base i-carbon:circle-solid  text-slate-400 animate-ping" />}>
          <EmojiPicker
            filter={emojiFilter}
            onEmojiClick={handleEmojiPick}
          />
        </Suspense>
      </div>
    </div>
  )
}
