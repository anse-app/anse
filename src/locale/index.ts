import * as Langs from './lang'
import type { SelectOptionType } from '@/types/provider'

export type LanguageType = keyof typeof Langs

export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair
}

export interface language {
  name: string
  desc: string
  locales: TranslatePair
}

export const locales = Object.fromEntries(Object.entries(Langs).map(([key, value]) => [key, value.locales]))

export const localesOptions: SelectOptionType[] = Object.entries(Langs).map(([key, value]) => ({ label: value.desc, value: key }))
