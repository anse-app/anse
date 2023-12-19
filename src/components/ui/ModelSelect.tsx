import { onMount } from 'solid-js'
import { Select } from '../ui/base'

interface Props {
  value: string
  models: { value: string, label: string }[]
  onChange: (value: string) => void
}

export default (props: Props) => {
  onMount(() => {
    if (!props.value && props.onChange)
      props.onChange(props.models[0].value)
  })
  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      options={props.models}
      selectedComponent={item => (
        <div class="fi gap-2">
          <div>{item.label}</div>
        </div>
      )}
      itemComponent={(item, isSelected) => (
        <div class="fi gap-2 w-full px-2 py-1 border-b border-b-base hv-base">
          <div class="flex-1">{item.label}</div>
          {isSelected && (
            <div i-carbon-checkmark />
          )}
        </div>
      )}
    />
  )
}
