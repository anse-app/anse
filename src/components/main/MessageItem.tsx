import { For } from 'solid-js/web'
import StreamableText from '../StreamableText'
import { DropDownMenu, Tooltip } from '../ui/base'
import type { MenuItem } from '../ui/base'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
  index: number
  handleStreaming?: () => void
}

export default (props: Props) => {
  const roleClass = {
    system: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300',
    assistant: 'bg-gradient-to-b from-[#fccb90] to-[#d57eeb]',
  }

  const handleCopyMessage = () => {

  }

  const menuList: MenuItem[] = [
    { id: 'retry', label: 'Retry message', icon: 'i-ion:refresh-outline' },
    { id: 'show', label: 'Show raw code', icon: 'i-carbon-code' },
    { id: 'share', label: 'Share message', icon: 'i-ion:ios-share-alt' },
    { id: 'edit', label: 'Edit message', icon: 'i-ion:md-create' },
    { id: 'copy', label: 'Copy message', icon: 'i-carbon-copy' },
    { id: 'delete', label: 'Delete message', icon: 'i-carbon-trash-can' },
  ]

  return (
    <div
      class="p-6 break-words group relative"
      classList={{
        'op-70 bg-darker': props.message.role === 'user',
      }}
    >
      <div class="max-w-base flex gap-4 overflow-hidden">
        <div class={`shrink-0 w-7 h-7 rounded-md op-80 ${roleClass[props.message.role]}`} />
        {/* TODO: MessageItem options menu */}
        <div class="sm:hidden block absolute bottom-2 right-2 z-10 op-70 cursor-pointer">
          {/* <DropDownMenu menuList={menuList}>
            <div class="text-xl i-carbon:overflow-menu-horizontal" />
          </DropDownMenu> */}
        </div>
        <div class={`hidden sm:block absolute right-6 -top-4 ${!props.index && 'top-0'}`}>
          <div class="op-0 group-hover:op-80 fcc space-x-2 !bg-base px-4 py-1 rounded-xl b border-base transition-opacity duration-400">
            <For each={menuList}>
              {item => (<Tooltip tip={item.label}><div class={`${item.icon} menu-icon`} /></Tooltip>)}
            </For>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <StreamableText
            text={props.message.content}
            streamInfo={props.message.stream
              ? () => ({
                  conversationId: props.conversationId,
                  messageId: props.message.id || '',
                  handleStreaming: props.handleStreaming,
                })
              : undefined}
          />
        </div>

      </div>
    </div>
  )
}
