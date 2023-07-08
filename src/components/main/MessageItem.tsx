import { Show } from 'solid-js/web'
import { createSignal } from 'solid-js'

import StreamableText from '@/components/StreamableText'
import MessageItemMenu from './MessageItemMenu'
import MessageItemEdit from './MessageItemEdit'
import MessageItemFunctionCall from './MessageItemFunctionCall'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
  index: number
  handleStreaming?: () => void
}

export default (props: Props) => {
  const [showRawCode, setShowRawCode] = createSignal(false)
  const [isEditing, setIsEditing] = createSignal(false)

  const roleClass = {
    system: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    assistant: 'bg-gradient-to-b from-[#fccb90] to-[#d57eeb]',
    function: 'bg-gradient-to-b from-[#a3a3c9] to-[#8989ba] text-white text-xl',
  }

  return (
    <div
      class="p-6 break-words group relative bg-base"
      classList={{
        'bg-base-100': props.message.role === 'user',
      }}
    >
      <div class="max-w-base flex gap-4 overflow-hidden">
        <div class={`shrink-0 fcc w-7 h-7 rounded-md op-80 ${roleClass[props.message.role]}`}>
          <Show when={props.message.role === 'function'}>
            <div class="i-carbon:function-math" />
          </Show>
        </div>
        <MessageItemMenu
          conversationId={props.conversationId}
          message={props.message}
          index={props.index}
        />
        <div class="flex-1 min-w-0">
          <Show when={isEditing()}>
            <MessageItemEdit
              conversationId={props.conversationId}
              message={props.message}
            />
          </Show>
          <Show when={!isEditing()}>
            {/* <div class="op-50 text-sm">{JSON.stringify(props.message)}</div> */}
            { props.message.role === 'function' && <MessageItemFunctionCall meta={props.message.input} result={props.message.content} /> }
            { props.message.role !== 'function' && (
              <StreamableText
                text={props.message.content}
                streamInfo={props.message.stream
                  ? () => ({
                      conversationId: props.conversationId,
                      messageId: props.message.id || '',
                      handleStreaming: props.handleStreaming,
                    })
                  : undefined}
                showRawCode={showRawCode()}
              />
            ) }
          </Show>
        </div>
      </div>
    </div>
  )
}
