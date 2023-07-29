// https://platform.openai.com/docs/guides/gpt/function-calling
export interface Plugin {
  id: string
  /** Icon of plugin. */
  icon: string
  /** The name of the plugin. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64. */
  name: string
  /** The description of what the plugin does. */
  description?: string
  /** The parameters the plugin accepts. */
  parameters: PluginParameters
  // Handle a prompt in conversation
  handleCall: (payload: Record<string, PromptProp>) => Promise<string>
}

type PromptProp = 'string' | 'number' | 'boolean'

interface PluginParameters {
  type: 'object'
  properties: Record<string, {
    type: PromptProp
    description?: string
    enum?: PromptProp[]
  }>
  required?: string[]
}

export interface PluginPayload {
  parameters: Record<string, PromptProp>
}
