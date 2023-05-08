import { createSignal, onCleanup } from 'solid-js'

export const useClickOutside = (ref: HTMLElement, handler: (e: MouseEvent) => any) => {
  const [clickedOutside, setClickedOutside] = createSignal(false)

  const handleClick = (event: MouseEvent) => {
    if (ref && (ref.contains(event.target as Node) || event.composedPath().includes(ref))) {
      setClickedOutside(false)
      return clickedOutside()
    } else {
      setClickedOutside(true)
      handler(event)
    }
  }

  const handleCleanup = () => {
    document.removeEventListener('click', handleClick)
  }

  document.addEventListener('click', handleClick)

  onCleanup(handleCleanup)

  return clickedOutside()
}
