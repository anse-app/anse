import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'

interface Props {
  initValue?: boolean
  label: string
  setValue: (v?: boolean) => void
}

export const Checkbox = (props: Props) => {
  const [state, send] = useMachine(checkbox.machine({
    id: createUniqueId(),
    checked: props.initValue ?? false,
    onChange(detail) {
      props.setValue(detail.checked as boolean)
    },
  }))

  const api = createMemo(() => checkbox.connect(state, send, normalizeProps))

  return (
    <label {...api().rootProps}>
      <div class="fi justify-revert cursor-pointer text-sm">
        <input {...api().inputProps} />
        {api().isChecked ? <div class="i-carbon:checkbox-checked text-xl" /> : <div class="i-carbon:checkbox text-xl" />}
        <div {...api().labelProps} class="ml-2 truncate flex-1">
          {props.label}
        </div>
        <div {...api().controlProps} />
      </div>
    </label>
  )
}
