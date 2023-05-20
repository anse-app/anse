import { useI18n } from '@/hooks'
import { addConversation } from '@/stores/conversation'
import Button from '../ui/Button'

export default () => {
  const { t } = useI18n()
  const handleAdd = () => {
    addConversation()
  }

  return (
    <Button
      icon="i-carbon-add"
      onClick={handleAdd}
      size="sm"
    >
      {t('conversations.add')}
    </Button>
  )
}
