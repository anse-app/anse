import { Show } from 'solid-js/web'
import { createSignal } from 'solid-js'

import type { JSXElement } from 'solid-js'

interface Props {
  // conversationId: string
  // index: number
  containerClass?: string
  avatarClass: string
  avatarIcon?: string
  children: JSXElement
}

export default (props: Props) => {
  const [showRawCode, setShowRawCode] = createSignal(false)
  const [isEditing, setIsEditing] = createSignal(false)

  return (
    <div class={`p-6 break-words group relative bg-base ${props.containerClass || ''}`}>
      <div class="max-w-base flex gap-4 overflow-hidden">
        <div class={`shrink-0 fcc w-7 h-7 rounded-md op-80 ${props.avatarClass}`}>
          <Show when={props.avatarIcon}>
            <div class={props.avatarIcon} />
          </Show>
        </div>
        {/* <MessageItemMenu
          conversationId={props.conversationId}
          message={props.message}
          index={props.index}
        /> */}
        <div class="flex-1 min-w-0">
          <Show when={isEditing()}>
            {/* <MessageItemEdit
              conversationId={props.conversationId}
              message={props.message}
            /> */}
          </Show>
          <Show when={!isEditing()}>
            { props.children }
          </Show>
        </div>
      </div>
    </div>
  )
}
