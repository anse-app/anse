import { Show } from 'solid-js'
import type { JSXElement } from 'solid-js'

interface Props {
  icon?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'normal' | 'primary' | 'ghost'
  prefix?: JSXElement
  children?: JSXElement
  onClick: () => void
}

export default (props: Props) => {
  const content = props.text || props.children
  const buttonSizeClass = () => ({
    sm: content || props.prefix ? 'px-2 h-7.5 text-xs gap-1' : 'w-7.5 h-7.5 text-xs',
    md: content || props.prefix ? 'px-3 h-10 text-sm gap-1.5' : 'w-10 h-10 text-sm',
    lg: content || props.prefix ? 'px-3 h-10 text-sm gap-1.5' : 'w-10 h-10 text-sm',
  }[props.size || 'md'])
  const buttonVariantClass = () => ({
    normal: 'bg-base-100 border border-base hover:(bg-base-200 border-base-100)',
    primary: 'bg-teal-600 dark:bg-teal-700 text-white border border-transparent hover:(bg-teal-700 dark:bg-teal-800)',
    ghost: 'bg-transparent border border-base hover:(bg-base-100 border-base-100)',
  }[props.variant || 'normal'])
  const iconSizeClass = () => ({
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-lg',
  }[props.size || 'md'])
  return (
    <div
      class={[
        'fcc rounded-md cursor-pointer transition-colors',
        buttonVariantClass(),
        buttonSizeClass(),
      ].join(' ')}
      onClick={props.onClick}
    >
      <Show when={props.prefix}>
        <div>{props.prefix}</div>
      </Show>
      <Show when={props.icon}>
        <div class={`${iconSizeClass()} ${props.icon}`} />
      </Show>
      <Show when={content}>
        <div>{content}</div>
      </Show>
    </div>
  )
}
