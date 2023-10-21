import * as slider from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createSignal, createUniqueId, mergeProps } from 'solid-js'
import type { Accessor, JSX } from 'solid-js'

function adjustValueToStep(
  value: number,
  step: number,
  min: number,
  max: number,
) {
  // Ensure value is a multiple of step, starting from min.
  const adjustedValue = Math.round((value - min) / step) * step + min

  // Ensure the adjusted value is within the min and max range.
  const boundedValue = Math.min(Math.max(adjustedValue, min), max)

  // Limit the number of decimal places based on the step.
  const decimalPlaces = (step.toString().split('.')[1] || []).length

  return parseFloat(boundedValue.toFixed(decimalPlaces))
}

interface Props {
  value: Accessor<number>
  min: number
  max: number
  step: number
  disabled?: boolean
  isInputEditable?: boolean
  setValue: (v: number) => void
}

export const Slider = (selectProps: Props) => {
  const props = mergeProps({
    min: 0,
    max: 10,
    step: 1,
    disabled: false,
    isInputEditable: true,
  }, selectProps)

  const formatSliderValue = (value: number) => {
    if (!value) return 0

    return Number.isInteger(value) ? value : parseFloat(value.toFixed(2))
  }

  const [input, setInput] = createSignal(props.value(), { equals: false })

  const [state, send] = useMachine(slider.machine({
    id: createUniqueId(),
    value: props.value(),
    min: props.min,
    max: props.max,
    step: props.step,
    disabled: props.disabled,
    onChange: (details) => {
      if (!details) return

      const value = formatSliderValue(details.value)
      props.setValue(value)
      setInput(value)
    },
  }))

  const api = createMemo(() => slider.connect(state, send, normalizeProps))

  const onInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (
    e,
  ) => {
    const target = e.target
    let value = Number(target.value)

    if (Number.isNaN(value)) value = props.value()

    api().setValue(value)
  }

  const onBlur: JSX.FocusEventHandler<HTMLInputElement, FocusEvent> = (
    event,
  ) => {
    const target = event.target
    let value = Number(target.value)

    // if input is not a number, reset to default value
    if (Number.isNaN(value)) value = props.value()

    value = adjustValueToStep(value, props.step, props.min, props.max)
    setInput(value)
  }

  return (
    <div {...api().rootProps}>
      <div class="text-xs op-50 focus-within:op-100 fb items-center">
        <div />
        {!props.isInputEditable && (
          <output {...api().outputProps}>
            {formatSliderValue(api().value)}
          </output>
        )}
        {props.isInputEditable && (
        <input
          class="bg-transparent border border-transparent w-[80px] text-right px-2 py-1 focus:border-base-100 transition-colors-200"
          onInput={onInput}
          onBlur={onBlur}
          value={input()}
          onKeyUp={(e) => {
            if (e.key === 'Enter')
              e.currentTarget.blur()
          }}
        />
        )}
      </div>
      <div class="mt-2" {...api().controlProps}>
        <div {...api().trackProps}>
          <div {...api().rangeProps} />
        </div>
        <div {...api().thumbProps}>
          <input {...api().hiddenInputProps} />
        </div>
      </div>
    </div>
  )
}
