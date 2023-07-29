import { Show } from 'solid-js/web'
import MessageItemUser from './MessageItemUser'
import MessageItemAssistant from './MessageItemAssistant'
import MessageItemFunction from './MessageItemFunction'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
  index: number
  handleStreaming?: () => void
}

export default (props: Props) => {
  return (
    <>
      <Show when={props.message.role === 'user'}>
        <MessageItemUser
          conversationId={props.conversationId}
          message={props.message}
          handleStreaming={props.handleStreaming}
        />
      </Show>
      <Show when={props.message.role === 'assistant'}>
        <MessageItemAssistant
          conversationId={props.conversationId}
          message={props.message}
          handleStreaming={props.handleStreaming}
        />
      </Show>
      <Show when={props.message.role === 'function'}>
        <MessageItemFunction
          functionInput={props.message.functionCallInput!}
        />
      </Show>
    </>
  )
}
