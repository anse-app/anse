import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { Show, children, createEffect, createMemo, createUniqueId } from 'solid-js'
import { Dynamic, For, Portal, spread } from 'solid-js/web'
import type { JSX, JSXElement } from 'solid-js'

export interface MenuItem {
  id: string
  label: string | JSXElement
  icon?: string
  children?: MenuItem[]
  role?: string
  action?: (params?: any) => void
}

interface Props {
  children: JSX.Element
  menuList: MenuItem[]
  close?: boolean
}

export const DropDownMenu = (props: Props) => {
  const [state, send] = useMachine(
    menu.machine({
      id: createUniqueId(),
      onSelect(details) {
        if (details.value) {
          const currentAction = props.menuList.find(item => item.id === details.value)?.action
          if (typeof currentAction === 'function')
            currentAction()
        }
      },
    }),
  )

  const api = createMemo(() => menu.connect(state, send, normalizeProps))

  const resolvedChild = () => {
    const child = children(() => props.children)
    createEffect(() => {
      spread(child() as Element, { ...api().triggerProps })
    })
    return child
  }

  return (
    <div>
      <Dynamic component={resolvedChild} />
      <Portal>
        <Show when={props.children}>
          <div {...api().positionerProps}>
            <div {...api().contentProps} class="bg-base text-sm border border-base rounded-md outline-none overflow-hidden shadow-md">
              <For each={props.menuList}>
                {item => (
                  <div class="px-3 py-2 flex items-center space-x-2 hv-base" {...api().getItemProps({ id: item.id })}>
                    {item.icon && <div class={item.icon} />}
                    <div>{item.label}</div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
      </Portal>
    </div>
  )
}
