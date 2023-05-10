import { createSignal, onCleanup, onMount } from 'solid-js'
import { throttle } from '@solid-primitives/scheduled'

export const useLargeScreen = (handler: (e: UIEvent) => void) => {
  const [isLargeScreen, setIsLargeScreen] = createSignal(false)

  const handleResize = throttle((e: UIEvent) => {
    setIsLargeScreen(window.innerWidth > 1024)
    if (window.innerWidth > 1024)
      return handler(e)
  }, 200)

  onMount(() => {
    window.addEventListener('resize', handleResize)
  })

  onCleanup(() => {
    window.removeEventListener('resize', handleResize)
  })

  return isLargeScreen
}
