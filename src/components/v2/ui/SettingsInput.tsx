import type { SettingsUI, SettingsUIInput } from '@/types/provider'
import type { Accessor } from 'solid-js'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
}

export default ({ settings, editing }: Props) => {
  if (!settings.name || !settings.type) return null
  const inputSettings = settings as SettingsUIInput
  return (
    <div>
      <div class="text-xs op-50">{inputSettings.name}</div>
      {editing() && inputSettings.description && <div class="mt-1 text-xs op-30">{inputSettings.description}</div>}
      <div class="mt-1 text-sm">
        {editing() && (
          <input
            type="text"
            value="https://api.openai.com"
            class="w-full mt-1 bg-transparent border border-base px-2 py-1 input-base focus:border-darker"
          />
        )}
        {!editing() && (
          <div>https://api.openai.com</div>
        )}
      </div>
    </div>
  )
}
