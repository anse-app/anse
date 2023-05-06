import { createEffect, createSignal } from 'solid-js'

export const useDark = () => {
  const [dark, setIsDark] = createSignal(false)

  const listenColorSchema = () => {
    const colorSchema = window.matchMedia('(prefers-color-scheme: dark)')
    colorSchema.addEventListener('change', () => {
      document.documentElement.classList.toggle('dark', colorSchema.matches)
    })
  }

  createEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme) { setIsDark(theme === 'dark') } else {
      const colorSchema = window.matchMedia('(prefers-color-scheme: dark)')
      setIsDark(colorSchema.matches)
    }
  }, [])

  createEffect(() => {
    document.documentElement.classList.toggle('dark', dark())
    localStorage.setItem('theme', dark() ? 'dark' : 'light')
  }, [dark()])

  listenColorSchema()

  return [dark, setIsDark] as const
}
