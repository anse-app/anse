import { useI18n } from '@/hooks'
import Button from '../ui/Button'

export default () => {
  const { t } = useI18n()
  const handleClick = () => {
    window.open('https://store.anse.app/')
  }

  return (
    <Button
      icon="i-carbon:software-resource-cluster"
      onClick={handleClick}
      size="sm"
    >
      {t('conversations.store')}
    </Button>
  )
}
