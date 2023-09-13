import { createEffect, createSignal } from 'solid-js'
import { writeClipboard } from '@solid-primitives/clipboard'

export const useClipboardCopy = (source: string | Blob, delay = 1000) => {
  const [copied, setCopied] = createSignal(false)

  const copy = async(value = source) => {
    writeClipboard(typeof value === 'string' ? value : [new ClipboardItem({ [value.type]: value })])
    setCopied(true)
  }

  createEffect(() => {
    if (copied()) {
      const timer = setTimeout(() => setCopied(false), delay)
      return () => clearTimeout(timer)
    }
  })

  return [copied, copy] as const
}
