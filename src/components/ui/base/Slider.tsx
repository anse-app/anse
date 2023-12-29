import * as slider from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createSignal, createUniqueId, mergeProps } from 'solid-js'
import type { Accessor } from 'solid-js'

interface Props {
  value: Accessor<number>
  min: number
  max: number
  step: number
  disabled?: boolean
  canEditSliderViaInput?: boolean
  setValue: (v: number) => void
}

export const Slider = (selectProps: Props) => {
  const props = mergeProps(
    {
      min: 0,
      max: 10,
      step: 1,
      disabled: false,
      canEditSliderViaInput: true,
    },
    selectProps,
  )

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

  return (
    <div {...api().rootProps}>
      <div class="text-xs op-50 focus-within:op-100 fb items-center">
        <div />
        {!props.canEditSliderViaInput && (
          <output {...api().outputProps}>
            {formatSliderValue(api().value)}
          </output>
        )}
        {props.canEditSliderViaInput && (
          <input
            type="text"
            spellcheck={false}
            autocomplete="off"
            autocorrect="off"
            aria-valuemax={props.max}
            aria-valuemin={props.min}
            aria-valuenow={input()}
            aria-controls={api().hiddenInputProps.id}
            aria-live="off"
            aria-label="Enter value to adjust slider"
            data-scope="slider"
            class="bg-transparent border border-transparent w-[80px] text-right px-2 py-1 hover:border-base focus:border-base-100 transition-colors-200"
            value={input()}
            onInput={(e) => {
              const target = e.target
              if (!target) return

              let value = Number(target.value)

              if (Number.isNaN(value)) value = props.value()

              api().setValue(value)
            }}
            onBlur={(e) => {
              const target = e.target
              if (!target) return

              let value = Number(target.value)

              if (Number.isNaN(value)) value = props.value()

              value = adjustValueToStep(
                value,
                props.step,
                props.min,
                props.max,
              )

              setInput(value)
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
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

/**
 * Adjusts the given value to the nearest multiple of 'step'
 * and ensures that the result lies within the range [min, max].
 *
 * @param value - The value to be adjusted.
 * @param step - The step size to which the value should be adjusted.
 * @param min - The minimum allowable value.
 * @param max - The maximum allowable value.
 *
 * @returns The adjusted value.
 */
function adjustValueToStep(
  value: number,
  step: number,
  min: number,
  max: number,
) {
  // Adjust the value to the nearest step
  const adjustedValue = Math.round((value - min) / step) * step + min

  // Clamp the value to the min and max
  const boundedValue = Math.min(Math.max(adjustedValue, min), max)

  // Round the value to the nearest decimal place
  const decimalPlaces = (step.toString().split('.')[1] || []).length

  return parseFloat(boundedValue.toFixed(decimalPlaces))
}
