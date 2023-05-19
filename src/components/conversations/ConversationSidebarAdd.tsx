import { useI18n } from '@/hooks'
import { addConversation } from '@/stores/conversation'

export default () => {
  const { t } = useI18n()
  const handleAdd = () => {
    addConversation()
  }

  return (
    <div
      class="flex items-center h-18 px-4 gap-4 border-b border-l-4 border-l-transparent border-b-base hv-base"
      onClick={handleAdd}
    >
      <div class="w-8 h-8 flex items-center justify-center op-60">
        <div class="i-carbon-add text-2xl" />
      </div>
      <div class="op-60">{t('conversations.add')}</div>
    </div>
  )
}
