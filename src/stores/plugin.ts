import pluginWebBrowsing from '@anse-app/plugin-web-browsing'
import type { Plugin } from '@/types/plugin'

export const pluginList = [
  pluginWebBrowsing(),
] as Plugin[]

export const pluginMetaList = pluginList.map(plugin => ({
  name: plugin.id,
  description: plugin.description,
  parameters: plugin.parameters,
}) as Omit<Plugin, 'handleCall'>)

export const getPluginById = (id: string) => {
  return pluginList.find(plugin => plugin.id === id)
}
