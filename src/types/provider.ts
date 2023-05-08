import type { ConversationType } from './conversation'
import type { Message } from './message'

export interface Provider {
  id: string
  /** Icon of provider. Only support `@unocss/preset-icons` class name for now. */
  icon: string
  /** Name of provider. */
  name: string
  /** Global settings of the provider. */
  globalSettings?: SettingsUI[]
  /** Bots list. Each bot provides a list of presets including conversation types, settings items, etc. */
  bots: Bot[]
  /** Whether the Provider can accept frontend or backend calls, or both. */
  supportCallMethod?: 'both' | 'frontend' | 'backend'
  // Handle a prompt in conversation
  handlePrompt: (payload: HandlerPayload, signal?: AbortSignal) => Promise<PromptResponse>
  /** Handle a temporary, rapidly prompt, used for interface display like conversation title's generation. */
  handleRapidPrompt?: (prompt: string, globalSettings: SettingsPayload) => Promise<string>
}

export interface Bot {
  id: string
  type: ConversationType
  name: string
  settings: SettingsUI[]
}

export type SettingsPayload = Record<string, string | number | boolean>

export interface HandlerPayload {
  conversationId: string
  conversationType: ConversationType
  botId: string
  globalSettings: SettingsPayload
  botSettings: SettingsPayload
  prompt?: string
  messages: Message[]
}

export type PromptResponse = string | ReadableStream | null | undefined

interface SettingsUIBase {
  key: string
  name: string
  description?: string
  default?: string | number | boolean
}

export interface SelectOptionType {
  value: any
  label: string
  icon?: string
}

export interface SettingsApiKey extends SettingsUIBase {
  type: 'api-key'
}

export interface SettingsUIInput extends SettingsUIBase {
  type: 'input'
}

export interface SettingsUISelect extends SettingsUIBase {
  type: 'select'
  options: SelectOptionType[]
}

export interface SettingsUISlider extends SettingsUIBase {
  type: 'slider'
  min: number
  max: number
  step: number
}

export interface SettingsUIToggle extends SettingsUIBase {
  type: 'toggle'
}

export type SettingsUI = SettingsApiKey | SettingsUIInput | SettingsUISelect | SettingsUISlider | SettingsUIToggle
