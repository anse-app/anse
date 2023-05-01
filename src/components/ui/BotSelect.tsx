import { onMount } from 'solid-js'
import { botMetaList } from '@/stores/provider'
import { Select } from '../ui/base'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default (props: Props) => {
  onMount(() => {
    if (!props.value && props.onChange)
      props.onChange(botMetaList[0].value)
  })
  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      options={botMetaList}
      selectedComponent={item => (
        <div class="fi gap-2">
          {item.provider.icon && <div class={item.provider.icon} />}
          <div>{item.provider.name} / {item.label}</div>
        </div>
      )}
      itemComponent={(item, isSelected) => (
        <div class="fi gap-2 w-full px-2 py-1 border-b border-b-base hv-base">
          {item.provider.icon && <div class={item.provider.icon} />}
          <div class="flex-1">{item.provider?.name} / {item.label}</div>
          {isSelected && (
            <div i-carbon-checkmark />
          )}
        </div>
      )}
    />
  )
}
