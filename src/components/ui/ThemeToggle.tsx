import { Show, onMount } from 'solid-js'
import { useDark } from '@/hooks'

export default () => {
  const [isDark, setIsDark] = useDark()

  onMount(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark() ? '#222222' : '#fafafa')
  })

  const handleDarkChanged = () => {
    const dark = !isDark()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#222222' : '#fafafa')
    setIsDark(dark)
  }

  return (
    <div
      class="fi p-2 rounded-md cursor-pointer text-lg hv-base hv-foreground"
      onClick={handleDarkChanged}
    >
      <Show when={isDark()} >
        <div i-carbon-moon />
      </Show>
      <Show when={!isDark()}>
        <div i-carbon-light />
      </Show>
    </div>
  )
}
