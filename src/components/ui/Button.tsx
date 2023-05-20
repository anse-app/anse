import { Show } from 'solid-js'
import type { JSXElement } from 'solid-js'

interface Props {
  icon?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'normal' | 'ghost'
  children?: JSXElement
  onClick: () => void
}

export default (props: Props) => {
  const buttonSizeClass = {
    sm: 'px-2 h-7.5 text-xs',
    md: 'px-3 h-10 text-sm',
    lg: 'px-3 h-10 text-sm',
  }[props.size || 'md']
  const buttonVariantClass = {
    normal: 'bg-base-100 border border-base hover:(bg-base-200 border-base-100)',
    ghost: 'bg-transparent border border-base hover:(bg-base-100 border-base-100)',
  }[props.variant || 'normal']
  const iconSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
  }[props.size || 'md']
  return (
    <div
      class={[
        'fi gap-1 rounded-md cursor-pointer transition-colors',
        buttonVariantClass,
        buttonSizeClass,
      ].join(' ')}
      onClick={props.onClick}
    >
      <Show when={props.icon}>
        <div class={`${iconSizeClass} ${props.icon}`} />
      </Show>
      <Show when={props.text || props.children}>
        <div>{props.text || props.children}</div>
      </Show>
    </div>
  )
}
