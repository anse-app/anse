import { createSignal } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { globalAbortController } from '@/stores/settings'
import { scrollController } from '@/stores/ui'
import { spliceUpdateMessageByConversationId } from '@/stores/messages'
import { handlePrompt } from '@/logics/conversation'
import Button from '@/components/ui/Button'
import { conversationMap } from '@/stores/conversation'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
}

export default (props: Props) => {
  let inputRef: HTMLTextAreaElement
  const $conversationMap = useStore(conversationMap)
  const [inputPrompt, setInputPrompt] = createSignal(props.message.content)

  const currentConversation = () => {
    return $conversationMap()[props.conversationId]
  }

  const handleSend = () => {
    if (!inputRef.value)
      return
    const controller = new AbortController()
    const currentMessage: MessageInstance = {
      ...props.message,
      content: inputPrompt(),
    }

    globalAbortController.set(controller)
    spliceUpdateMessageByConversationId(props.conversationId, currentMessage)
    // setIsEditing(false)
    handlePrompt(currentConversation(), '', controller.signal)
    scrollController().scrollToBottom()
  }

  return (
    <>
      <textarea
        ref={inputRef!}
        value={inputPrompt()}
        autocomplete="off"
        onInput={() => { setInputPrompt(inputRef.value) }}
        onKeyDown={(e) => {
          e.key === 'Enter' && !e.isComposing && !e.shiftKey && handleSend()
        }}
        class="op-70 bg-darker py-4 px-[calc(max(1.5rem,(100%-48rem)/2))] w-full inset-0 scroll-pa-4 input-base rounded-md"
      />
      <div class="flex justify-end space-x-2 mt-1">
        {/* <Button size="sm" onClick={() => setIsEditing(false)}>Cancel</Button> */}
        <Button size="sm" variant="primary" onClick={() => handleSend()}>Submit</Button>
      </div>
    </>
  )
}
