import type { ConversationType } from './conversation'
import type { SettingsUI } from './provider'

export interface GeneralSettings {
  /** Default request directly, can choose to request via proxy */
  requestWithBackend: boolean
}

export interface BotMeta {
  value: string
  type: ConversationType
  label: string
  provider: {
    id: string
    name: string
    icon: string
  }
  settingsUI: SettingsUI[]
}
