import { createSignal } from 'solid-js'
import { providerMetaList } from '@/stores/provider'
import { Select } from '../ui/base'
import type { ConversationType } from '@/types/conversation'

interface BotMeta {
  value: string
  type: ConversationType
  label: string
  provider: {
    id: string
    name: string
    icon: string
  }
}

const botMetaList: BotMeta[] = providerMetaList.map((provider) => {
  return provider.bots.map(bot => ({
    value: bot.id,
    type: bot.type,
    label: bot.name,
    provider: {
      id: provider.id,
      name: provider.name,
      icon: provider.icon,
    },
  }))
}).flat()

export default () => {
  const [value, setValue] = createSignal('')

  return (
    <Select
      value={value()}
      onChange={setValue}
      options={botMetaList}
      selectedComponent={item => (
        <div class="fi gap-2">
          {item.provider.icon && <div class={item.provider.icon} />}
          <div>{item.provider.name} / {item.label}</div>
        </div>
      )}
      itemComponent={(item, isSelected) => (
        <div class="fi gap-2 w-full px-2 py-1 border-b border-b-base hv-base">
          {item.provider.icon && <div class={item.provider.icon} />}
          <div class="flex-1">{item.provider.name} / {item.label}</div>
          {isSelected && (
          <div i-carbon-checkmark />
          )}
        </div>
      )}
    />
  )
}
