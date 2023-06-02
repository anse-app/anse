import * as tabs from '@zag-js/tabs'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { For, createMemo, createUniqueId } from 'solid-js'
import type { JSX } from 'solid-js'

export interface TabItem {
  value: string
  label: string
  content: JSX.Element
}

interface Props {
  tabs: TabItem[]
  initValue?: string
  sticky?: boolean
  tabClass?: string
}

export const Tabs = (props: Props) => {
  const [state, send] = useMachine(tabs.machine({ id: createUniqueId(), value: props.initValue ?? props.tabs[0].value }))

  const api = createMemo(() => tabs.connect(state, send, normalizeProps))

  return (
    <div {...api().rootProps} class="w-full text-sm font-medium text-center">
      <div {...api().tablistProps} class={`flex flex-wrap -mb-px border-b border-base ${props.sticky && 'sticky top-0 bottom-0 bg-white'} ${props.tabClass}`}>
        <For each={props.tabs}>
          {item => (
            <button class={`inline-block p-4 border-b-2 border-transparent hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer ${api().value === item.value && '!border-emerald-600 !text-emerald-600'}`} {...api().getTriggerProps({ value: item.value })}>
              {item.label}
            </button>
          )}
        </For>
      </div>
      <For each={props.tabs}>
        {item => (
          <div class="w-full text-sm mt-4 border border-base p-4" {...api().getContentProps({ value: item.value })}>
            {item.content}
          </div>
        )}
      </For>
    </div>
  )
}
