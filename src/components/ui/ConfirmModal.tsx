import {
  showConfirmModal,
} from '@/stores/ui'
import { useI18n } from '@/hooks'
import Modal from './Modal'

interface Props {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

export default (props: Props) => {
  const { t } = useI18n()
  return (
    <Modal bindValue={showConfirmModal} direction="bottom" closeBtnClass="hidden" >
      <div class="max-h-[70vh] w-full">
        <div class="grid w-full max-w-lg scale-100 gap-4 border-base sm:border bg-white dark:bg-zinc-900/90 dark:backdrop-blur-lg p-4 opacity-100 shadow-lg  sm:rounded-lg  md:w-full">
          <div class="flex flex-col space-y-2 text-center sm:text-left"><h2 id="radix-:rl:" class="text-lg font-semibold">{props.title}</h2><p id="radix-:rm:" class="text-sm text-muted-foreground">{props.description}</p></div>
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button class="button" onClick={() => props.onCancel()}>{t('conversations.confirm.cancel')}</button>
            <button class="emerald-button" onClick={() => props.onConfirm()}>{t('conversations.confirm.btn')}</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
