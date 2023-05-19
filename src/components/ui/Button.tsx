import { Show } from 'solid-js'
import type { JSXElement } from 'solid-js'

interface Props {
  icon?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
  children?: JSXElement
  onClick: () => void
}

export default (props: Props) => {
  const sizeClass = {
    sm: 'px-2 h-7 text-xs',
    md: 'px-3 h-10 text-sm',
    lg: 'px-3 h-10 text-sm',
  }[props.size || 'md']
  return (
    <div
      class={[
        'fi gap-1 bg-base-100 border border-darker rounded-md cursor-pointer transition-colors',
        'hover:(bg-base-200)',
        sizeClass,
      ].join(' ')}
      onClick={props.onClick}
    >
      <Show when={props.icon}>
        <div class={`text-sm ${props.icon}`} />
      </Show>
      <Show when={props.text || props.children}>
        <div>{props.text || props.children}</div>
      </Show>
    </div>
  )
}
