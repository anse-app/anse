import { createSignal, onCleanup, onMount } from 'solid-js'
import { throttle } from '@solid-primitives/scheduled'

export const useMobileScreen = (handler: (e: UIEvent) => void) => {
  const [isMobileScreen, setIsMobileScreen] = createSignal(false)

  const handleResize = throttle((e: UIEvent) => {
    setIsMobileScreen(window.innerWidth < 640)
    if (window.innerWidth < 640)
      return handler(e)
  }, 200)

  onMount(() => {
    window.addEventListener('resize', handleResize)
  })

  onCleanup(() => {
    window.removeEventListener('resize', handleResize)
  })

  return isMobileScreen
}
