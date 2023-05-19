import { createEffect, createMemo, createSignal, createUniqueId, mergeProps, on } from 'solid-js'
import * as select from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/solid'
import type { JSXElement } from 'solid-js'
import type { SelectOptionType } from '@/types/provider'

interface Props<T> {
  options: T[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
  readonly?: boolean
  selectedComponent?: (item: T) => JSXElement
  itemComponent?: (item: T, isSelected: boolean) => JSXElement
}

export const Select = <T extends SelectOptionType>(inputProps: Props<T>) => {
  const [selectedItem, setSelectedItem] = createSignal<T | null>(null)
  const props = mergeProps({
    placeholder: 'Select option',
  }, inputProps)
  const [state, send] = useMachine(select.machine({
    id: createUniqueId(),
    selectedOption: props.options.find(o => o.value === props.value),
    readOnly: props.readonly,
    onChange: (detail) => {
      console.log('trigger')
      if (detail) {
        setSelectedItem(props.options.find(o => o.value === detail.value))
        props.onChange(detail.value)
      }
    },
  }))

  const api = createMemo(() => select.connect(state, send, normalizeProps))

  createEffect(on(() => props.value, () => {
    const option = props.options.find(o => o.value === props.value)
    if (option)
      setSelectedItem(option)
  }))

  const selectedComponent = (item: T | null) => {
    if (!item) return <div>{props.placeholder}</div>
    if (props.selectedComponent) return props.selectedComponent(item)
    return (
      <div class="fi gap-2">
        {item?.icon && <div class={item.icon} />}
        <div>{item.label ?? props.placeholder}</div>
      </div>
    )
  }

  const itemComponent = (item: T, isSelected: boolean) => {
    if (props.itemComponent) return props.itemComponent(item, isSelected)
    return (
      <div class="fi justify-between w-full px-2 py-1 border-b border-b-base hv-base">
        <div class="fi gap-2">
          {item.icon && <div class={item.icon} />}
          <div>{item.label}</div>
        </div>
        {isSelected && (
          <div i-carbon-checkmark />
        )}
      </div>
    )
  }

  return (
    <div>
      <div>
        <button
          class={`fi justify-between w-full px-2 py-1 border border-base ${props.readonly ? '' : 'hv-base'}`}
          {...api().triggerProps}
        >
          {selectedComponent(selectedItem())}
          {!props.readonly && <div i-carbon-caret-down />}
        </button>
      </div>
      <div class="w-$reference-width -mt-2 z-100 shadow-md" {...api().positionerProps}>
        <ul class="bg-base" {...api().contentProps}>
          {props.options.map(item => (
            <li
              {...api().getOptionProps({ label: item.label, value: item.value })}
              onClick={() => {
                setSelectedItem(item)
                props.onChange(item.value)
              }}
            >
              {itemComponent(item, item.value === selectedItem()?.value)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
