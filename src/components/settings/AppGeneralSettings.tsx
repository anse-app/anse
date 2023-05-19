import { For } from 'solid-js'
import { localesOptions } from '@/locale'
import { useI18n } from '@/hooks'
import SettingsUIComponent from './SettingsUIComponent'
import type { Accessor } from 'solid-js'
import type { GeneralSettings } from '@/types/app'
import type { SettingsUI } from '@/types/provider'

interface Props {
  settingsValue: Accessor<GeneralSettings>
  updateSettings: (v: Partial<GeneralSettings>) => void
}

export default (props: Props) => {
  const { t } = useI18n()

  const settingsUIList = () => ([
    {
      key: 'requestWithBackend',
      name: t('settings.general.requestWithBackend'),
      type: 'toggle',
      default: false,
    },
    {
      key: 'locale',
      name: t('settings.general.locale'),
      type: 'select',
      default: 'en',
      options: localesOptions,
    },
  ] as SettingsUI[])

  return (
    <div class="px-4 py-3 transition-colors border-b border-base">
      <h3 class="fi gap-2">
        <div class="flex-1 fi gap-1.5 overflow-hidden">
          <div class="i-carbon-settings" />
          <div class="flex-1 text-sm truncate">{t('settings.general.title')}</div>
        </div>
      </h3>
      <div class="mt-2 flex flex-col">
        <For each={settingsUIList()}>
          {(item) => {
            return (
              <SettingsUIComponent
                settings={item}
                editing={() => true}
                value={() => props.settingsValue()[item.key as keyof GeneralSettings] || item.default || ''}
                setValue={(v) => {
                  props.updateSettings({ [item.key]: v })
                }}
              />
            )
          }}
        </For>
      </div>
    </div>
  )
}
