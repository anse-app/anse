import { Match, Switch, createSignal, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { createShortcut } from '@solid-primitives/keyboard'
import { currentErrorMessage, isSendBoxFocus, scrollController } from '@/stores/ui'
import { addConversation, conversationMap, currentConversationId } from '@/stores/conversation'
import { loadingStateMap, streamsMap } from '@/stores/streams'
import { handlePrompt } from '@/logics/conversation'
import { globalAbortController } from '@/stores/settings'
import { useI18n, useMobileScreen } from '@/hooks'
import Button from './ui/Button'

export default () => {
  const { t } = useI18n()
  let inputRef: HTMLTextAreaElement
  const $conversationMap = useStore(conversationMap)
  const $currentConversationId = useStore(currentConversationId)
  const $isSendBoxFocus = useStore(isSendBoxFocus)
  const $currentErrorMessage = useStore(currentErrorMessage)
  const $streamsMap = useStore(streamsMap)
  const $loadingStateMap = useStore(loadingStateMap)
  const $globalAbortController = useStore(globalAbortController)

  const [inputPrompt, setInputPrompt] = createSignal('')
  const [footerClass, setFooterClass] = createSignal('')
  const isEditing = () => inputPrompt() || $isSendBoxFocus()
  const currentConversation = () => {
    return $conversationMap()[$currentConversationId()]
  }
  const isStreaming = () => !!$streamsMap()[$currentConversationId()]
  const isLoading = () => !!$loadingStateMap()[$currentConversationId()]

  onMount(() => {
    createShortcut(['Control', 'Enter'], () => {
      $isSendBoxFocus() && handleSend()
    })

    useMobileScreen(() => {
      setFooterClass('sticky bottom-0 left-0 right-0 overflow-hidden')
    })
  })

  const stateType = () => {
    if ($currentErrorMessage())
      return 'error'
    else if (isLoading() || isStreaming())
      return 'loading'
    else if (isEditing())
      return 'editing'
    else
      return 'normal'
  }

  const EmptyState = () => (
    <div
      class="max-w-base h-full fi flex-row gap-2"
      onClick={() => {
        isSendBoxFocus.set(true)
        inputRef.focus()
      }}
    >
      <div class="flex-1 op-30 text-sm">{t('send.placeholder')}</div>
    </div>
  )

  const EditState = () => (
    <div class="h-full flex flex-col">
      <div class="flex-1 relative">
        <textarea
          ref={inputRef!}
          placeholder={t('send.placeholder')}
          autocomplete="off"
          onBlur={() => { isSendBoxFocus.set(false) }}
          onInput={() => { setInputPrompt(inputRef.value) }}
          onKeyDown={(e) => {
            e.key === 'Enter' && !e.isComposing && !e.shiftKey && handleSend()
          }}
          class="h-full w-full absolute inset-0 py-4 px-[calc(max(1.5rem,(100%-48rem)/2))] scroll-pa-4 input-base text-sm"
        />
      </div>
      <div class="fi justify-between gap-2 h-14 px-[calc(max(1.5rem,(100%-48rem)/2)-0.5rem)] border-t border-base">
        <div>
          {/* <Button
            icon="i-carbon-plug"
            onClick={() => {}}
          /> */}
        </div>
        <Button
          icon="i-carbon-send"
          onClick={handleSend}
          variant={inputPrompt() ? 'primary' : 'normal'}
          // prefix={t('send.button')}
        />
      </div>
    </div>
  )

  const ErrorState = () => (
    <div class="max-w-base h-full flex items-end flex-col justify-between gap-8 sm:(flex-row items-center) py-4 text-error text-sm">
      <div class="flex-1 w-full">
        <div class="fi gap-0.5 mb-1">
          <span i-carbon-warning />
          <span class="font-semibold">{$currentErrorMessage()?.code}</span>
        </div>
        <div>{$currentErrorMessage()?.message}</div>
      </div>
      <div
        class="border border-error px-2 py-1 rounded-md hv-base hover:bg-white"
        onClick={() => { currentErrorMessage.set(null) }}
      >
        Dismiss
      </div>
    </div>
  )

  const clearPrompt = () => {
    setInputPrompt('')
    isSendBoxFocus.set(false)
  }

  const handleAbortFetch = () => {
    $globalAbortController()?.abort()
    clearPrompt()
  }

  const LoadingState = () => (
    <div class="max-w-base h-full fi flex-row gap-2">
      <div class="flex-1 op-50">Thinking...</div>
      <div
        class="border border-base-100 px-2 py-1 rounded-md text-sm op-40 hv-base hover:bg-white"
        onClick={() => { handleAbortFetch() }}
      >
        Abort
      </div>
    </div>
  )

  const handleSend = () => {
    if (!inputRef.value)
      return
    if (!currentConversation())
      addConversation()

    const controller = new AbortController()
    globalAbortController.set(controller)
    handlePrompt(currentConversation(), inputRef.value, controller.signal)
    clearPrompt()
    scrollController().scrollToBottom()
  }

  const stateRootClass = () => {
    if (stateType() === 'normal')
      return 'hv-base'
    else if (stateType() === 'error')
      return 'bg-red/8'
    else if (stateType() === 'loading')
      return 'loading-anim bg-base-100'
    else if (stateType() === 'editing')
      return 'bg-base-100'
    return ''
  }

  const stateHeightClass = () => {
    if (stateType() === 'normal')
      return 'px-6 h-14'
    else if (stateType() === 'error')
      return 'px-6'
    else if (stateType() === 'loading')
      return 'px-6 h-14'
    else if (stateType() === 'editing')
      return 'h-54'
    return ''
  }

  return (
    <div class={`relative shrink-0 border-t border-base pb-[env(safe-area-inset-bottom)] transition transition-colors duration-300  ${stateRootClass()} ${footerClass()}`}>
      <div class={`relative transition transition-height duration-240 ${stateHeightClass()}`}>
        <Switch fallback={<EmptyState />}>
          <Match when={stateType() === 'error'}>
            <ErrorState />
          </Match>
          <Match when={stateType() === 'loading'}>
            <LoadingState />
          </Match>
          <Match when={stateType() === 'editing'}>
            <EditState />
          </Match>
        </Switch>
      </div>
    </div>
  )
}
