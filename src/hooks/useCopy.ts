import { createEffect, createSignal } from 'solid-js'
import { writeClipboard } from '@solid-primitives/clipboard'

export const useClipboardCopy = (source: string, delay = 1000) => {
  const [copied, setCopied] = createSignal(false)

  const copy = async() => {
    writeClipboard(source)
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
