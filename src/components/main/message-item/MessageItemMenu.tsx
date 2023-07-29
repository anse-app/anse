import { For, createSignal } from 'solid-js'
import { useClipboardCopy } from '@/hooks'
import { deleteMessageByConversationId, getMessagesByConversationId, spliceMessageByConversationId, spliceUpdateMessageByConversationId, updateMessage } from '@/stores/messages'
import { DropDownMenu, Tooltip } from '@/components/ui/base'
import { globalAbortController } from '@/stores/settings'
import { handlePrompt } from '@/logics/conversation'
import { scrollController } from '@/stores/ui'
import type { MenuItem } from '@/components/ui/base'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
  index: number
}

export default (props: Props) => {
  const handleCopyMessageItem = () => {
    const [Iscopied, copy] = useClipboardCopy(props.message.content)
    copy()
    setCopied(Iscopied())
    setTimeout(() => setCopied(false), 1000)
  }

  const handleDeleteMessageItem = () => {
    deleteMessageByConversationId(props.conversationId, props.message.id)
  }

  const handleRetryMessageItem = () => {
    const controller = new AbortController()
    globalAbortController.set(controller)
    spliceMessageByConversationId(props.conversationId, props.message.id)
    // handlePrompt(currentConversation(), '', controller.signal)
    // TODO: scrollController seems not working
    scrollController().scrollToBottom()
  }

  const handleEditMessageItem = () => {
    // setIsEditing(true)
    // inputRef.focus()
  }

  const handleShareMessageItem = () => {
    // const messages = getMessagesByConversationId($currentConversationId())
    // messages.forEach((message) => {
    //   updateMessage($currentConversationId(), message.id, { isSelected: props.message.id === message.id },
    //   )
    // })
    // showShareModal.set(true)
  }

  const [menuList, setMenuList] = createSignal<MenuItem[]>([
    { id: 'retry', label: 'Retry send', icon: 'i-carbon:restart', role: 'all', action: handleRetryMessageItem },
    // { id: 'raw', label: 'Show raw code', icon: 'i-carbon-code', role: 'system', action: () => setShowRawCode(!showRawCode()) },
    { id: 'edit', label: 'Edit message', icon: 'i-carbon:edit', role: 'user', action: handleEditMessageItem },
    { id: 'copy', label: 'Copy message', icon: 'i-carbon-copy', role: 'all', action: handleCopyMessageItem },
    { id: 'delete', label: 'Delete message', icon: 'i-carbon-trash-can', role: 'all', action: handleDeleteMessageItem },
    { id: 'share', label: 'Share message', icon: 'i-carbon:export', role: 'all', action: handleShareMessageItem },
  ])
  const [copied, setCopied] = createSignal(false)

  if (props.message.role === 'user')
    setMenuList(menuList().filter(item => ['all', 'user'].includes(item.role!)))
  else
    setMenuList(menuList().filter(item => ['all', 'system'].includes(item.role!)))

  return (
    <>
      <div id="menuList-wrapper" class="sm:hidden block absolute bottom-2 right-4 z-10 cursor-pointer op-0 group-hover-op-70">
        <DropDownMenu menuList={menuList()}>
          <div class="text-xl i-carbon:overflow-menu-horizontal" />
        </DropDownMenu>
      </div>
      <div class={`hidden sm:block absolute right-6 -top-4 ${!props.index && 'top-0'}`}>
        <div class="op-0 group-hover:op-80 fcc space-x-2 !bg-base px-2 py-1 rounded-md border border-base transition-opacity">
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
    </>
  )
}
