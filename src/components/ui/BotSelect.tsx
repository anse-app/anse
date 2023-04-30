import { providerMetaList } from '@/stores/provider'
import type { ConversationType } from '@/types/conversation'

interface BotMeta {
  id: string
  type: ConversationType
  name: string
  provider: {
    id: string
    name: string
    icon: string
  }
}

const botMetaList: BotMeta[] = providerMetaList.map((provider) => {
  return provider.bots.map(bot => ({
    id: bot.id,
    type: bot.type,
    name: bot.name,
    provider: {
      id: provider.id,
      name: provider.name,
      icon: provider.icon,
    },
  }))
}).flat()

export default () => {
  return (
    <div>{JSON.stringify(botMetaList)}</div>
  )
}
