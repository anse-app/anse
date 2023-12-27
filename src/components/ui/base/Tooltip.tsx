import * as tooltip from '@zag-js/tooltip'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { Show, children, createEffect, createMemo, createUniqueId } from 'solid-js'
import { Dynamic, spread } from 'solid-js/web'
import type { JSX, JSXElement } from 'solid-js'

interface Props {
  tip: string | JSXElement
  children: JSX.Element
  openDelay?: number
  closeDelay?: number
  handleChildClick?: () => void
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
}

export const Tooltip = (props: Props) => {
  // TODO Official demo type error
  const [state, send] = useMachine(
    tooltip.machine({
      id: createUniqueId(),
      openDelay: props.openDelay ?? 300,
      closeDelay: props.closeDelay ?? 300,
      positioning: {
        placement: props.placement ?? 'top',
      },
    }),
  )

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps))

  const resolvedChild = () => {
    const child = children(() => props.children)
    createEffect(() => {
      spread(child() as Element, { ...api().triggerProps, onClick: props.handleChildClick })
    })
    return child()
  }

  return (
    <div>
      <Dynamic component={resolvedChild} />
      <Show when={api().isOpen}>
        <div {...api().positionerProps} class="transition-opacity duration-300">
          <div {...api().contentProps} class="px-2 py-1 text-xs text-white bg-dark-600 dark:bg-dark rounded-md shadow-sm">{ props.tip }</div>
        </div>
      </Show>
    </div>
  )
}
