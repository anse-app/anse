import { For } from 'solid-js/web'
import { createSignal } from 'solid-js'
import { useClipboardCopy } from '@/hooks'
import { deleteMessageByConversationId } from '@/stores/messages'
import StreamableText from '../StreamableText'
import { Tooltip } from '../ui/base'
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

  const [copied, copy] = useClipboardCopy(props.message.content)
  const [showRawCode, setShowRawCode] = createSignal(false)

  const handleDeleteMessageItem = () => {
    deleteMessageByConversationId(props.conversationId, props.message)
  }

  const [menuList, setMenuList] = createSignal<MenuItem[]>([
    // TODO: Retry send message
    // { id: 'retry', label: 'Retry send', icon: 'i-ion:refresh-outline', role: 'all' },
    { id: 'raw', label: 'Show raw code', icon: 'i-carbon-code', role: 'system', action: () => setShowRawCode(!showRawCode()) },
    // TODO: Share message
    // { id: 'share', label: 'Share message', icon: 'i-ion:ios-share-alt' },
    // TODO: Edit message
    // { id: 'edit', label: 'Edit message', icon: 'i-ion:md-create', role: 'user' },
    { id: 'copy', label: 'Copy message', icon: 'i-carbon-copy', role: 'all', action: copy },
    { id: 'delete', label: 'Delete message', icon: 'i-carbon-trash-can', role: 'all', action: handleDeleteMessageItem },
  ])

  if (props.message.role === 'user')
    setMenuList(menuList().filter(item => ['all', 'user'].includes(item.role!)))
  else
    setMenuList(menuList().filter(item => ['all', 'system'].includes(item.role!)))

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
            <For each={menuList()}>
              {item => (
                <Tooltip tip={item.label} handleChildClick={item.action}>
                  {
                    item.id === 'copy'
                      ? <div class={`menu-icon ${copied() ? 'i-carbon-checkmark !text-emerald-400' : 'i-carbon-copy'}`} />
                      : <div class={`${item.icon} menu-icon`} />
                  }
                </Tooltip>)}
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
            showRawCode={showRawCode()}
          />
        </div>

      </div>
    </div>
  )
}
