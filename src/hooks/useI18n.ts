import { createSignal } from 'solid-js'
import { en } from '@/locale/lang'
import { locales } from '@/locale'
import { providerSettingsMap } from '@/stores/settings'
import { useDeepGet } from './useDepGet'
import type { Accessor } from 'solid-js'
import type { TranslatePair } from '@/locale'
import type { GeneralSettings } from '@/types/app'

const [currentLocale, setCurrentLocale] = createSignal(en.locales)

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export interface I18nContext {
  locale: TranslatePair
  t: Translator
}

export const translate = (path: string, option: TranslatorOption | undefined) => {
  return currentLocale() ? (useDeepGet(currentLocale(), path, path) as string).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`) : ''
}

export const buildTranslator = (): Translator => (path, option) => translate(path, option)
export const buildI18nContext = (locale: Accessor<TranslatePair>): I18nContext => {
  return {
    locale: locale(),
    t: buildTranslator(),
  }
}

export function useI18n() {
  let defaultLocale = providerSettingsMap.get()?.general?.locale ?? 'en'
  providerSettingsMap.listen((value, changedKey) => {
    const general = value[changedKey ?? 'general'] as unknown as GeneralSettings
    defaultLocale = general?.locale
    defaultLocale && setCurrentLocale(locales[defaultLocale as string])
  })

  setCurrentLocale(locales[defaultLocale as string])
  return buildI18nContext(currentLocale)
}
