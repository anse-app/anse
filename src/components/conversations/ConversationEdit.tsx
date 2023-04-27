import { Show, createSignal } from 'solid-js'
import { showSystemInfoModel } from '@/stores/ui'
import { providerMetaList } from '@/stores/provider'
import { Select } from '@/components/ui/base'
import type { Conversation, ConversationType } from '@/types/conversation'

const typeSelectList = [
  {
    value: 'continuous' as const,
    label: 'Continuous Conversation',
    icon: 'i-carbon-edt-loop',
  },
  {
    value: 'single' as const,
    label: 'Single Conversation',
    icon: 'i-carbon-connect',
  },
  {
    value: 'image' as const,
    label: 'Image Generation',
    icon: 'i-carbon-image',
  },
]

interface Props {
  conversation: Conversation
  handleChange: (payload: Partial<Conversation>) => void
}

export default (props: Props) => {
  const [selectProviderId, setSelectProviderId] = createSignal(props.conversation.providerId || providerMetaList[0]?.id)
  const [selectConversationType, setSelectConversationType] = createSignal<ConversationType>(props.conversation.conversationType || 'continuous')
  const selectProvider = () => providerMetaList.find(item => item.id === selectProviderId()) || null
  const supportedConversationType = () => typeSelectList.filter(item => selectProvider()?.supportConversationType.includes(item.value))

  const handleProviderChange = (id: string) => {
    setSelectProviderId(id)
    props.handleChange({ providerId: id })
    // TODO: This will crash the app
    // setSelectConversationType(selectProvider()?.supportConversationType[0] || 'continuous')
  }

  const handleConversationTypeChange = (type: ConversationType) => {
    setSelectConversationType(type)
    const payload: Partial<Conversation> = { conversationType: type }
    if (type === 'image') {
      payload.systemInfo = undefined
      payload.mockMessages = undefined
    }
    props.handleChange(payload)
  }

  const handleOpenIconSelector = () => {
    // TODO: Icon selector by `emoji-mart`
  }

  const handleOpenSystemInfoSettings = () => {
    showSystemInfoModel.set(true)
  }

  const handleOpenMockMessages = () => {
    // TODO
  }

  return (
    <div class="flex flex-col gap-4">
      <div
        class="w-16 h-16 border border-base rounded-xl border-dashed hv-base"
        onClick={handleOpenIconSelector}
      />
      <input
        type="text"
        class="font-semibold mr-12 mb-3 px-1 truncate outline-0 bg-transparent placeholder:op-40"
        placeholder="Untitled"
        value={props.conversation.name}
        onBlur={e => props.handleChange({ name: e.currentTarget.value })}
      />
      <div class="py-1 border bg-base-50 border-base rounded-lg text-sm">
        <div class="fi justify-between gap-10 px-4 h-10">
          <h3 class="op-80 shrink-0">Provider</h3>
          <Select
            options={providerMetaList.map(item => ({ value: item.id, label: item.name, icon: item.icon }))}
            value={selectProviderId}
            setValue={handleProviderChange}
          />
        </div>
        <div class="fi justify-between gap-10 px-4 h-10">
          <h3 class="op-80 shrink-0">Conversation Type</h3>
          <Select
            options={supportedConversationType()}
            value={selectConversationType}
            setValue={handleConversationTypeChange}
          />
        </div>
      </div>
      <Show when={selectConversationType() !== 'image'}>
        <div class="py-1 border bg-base-50 border-base rounded-lg text-sm">
          <div class="px-4 py-2">
            <h3 class="op-80 shrink-0">System Info</h3>
            <textarea
              value={props.conversation.systemInfo || ''}
              rows="4"
              class="input-base mt-2 w-full"
              placeholder="You are a helpful assistant, answer as concisely as possible..."
              onBlur={e => props.handleChange({ systemInfo: e.currentTarget.value })}
            />
          </div>
          {/* <div class="fi justify-between gap-10 pl-4 pr-2 h-10">
            <h3 class="op-80 shrink-0">Mock Messages</h3>
            <div class="flex-1 fi justify-end overflow-hidden px-2 py-1 cursor-pointer" onClick={handleOpenMockMessages}>
              <p class="text-xs op-50 truncate">2 messages</p>
              <div i-carbon-chevron-right class="shrink-0" />
            </div>
          </div> */}
        </div>
      </Show>
    </div>
  )
}
