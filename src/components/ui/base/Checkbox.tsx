import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'

interface Props {
  initValue?: boolean
  label: string
}

export const Checkbox = (props: Props) => {
  const [state, send] = useMachine(checkbox.machine({ id: createUniqueId(), checked: props.initValue ?? false }))

  const api = createMemo(() => checkbox.connect(state, send, normalizeProps))

  return (
    <label {...api().rootProps}>
      <span {...api().labelProps}>
        {props.label}
      </span>
      <input {...api().inputProps} />
      <div {...api().controlProps} />
    </label>
  )
}
