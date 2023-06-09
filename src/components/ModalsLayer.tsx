import {
  showConversationEditModal,
  showConversationSidebar,
  showEmojiPickerModal,
  showSelectMessageModal,
  showSettingsSidebar,
  showShareModal,
} from '@/stores/ui'
import ConversationSidebar from './conversations/ConversationSidebar'
import SettingsSidebar from './settings/SettingsSidebar'
import ConversationEditModal from './conversations/ConversationEditModal'
import EmojiPickerModal from './ui/EmojiPickerModal'
import ShareModal from './ui/ShareModal'
import SelectMessageModal from './ui/SelectMessageModal'
import Modal from './ui/Modal'

export default () => {
  return (
    <>
      <Modal bindValue={showConversationSidebar} direction="left" closeBtnClass="hidden">
        <div class="w-[70vw] max-w-[300px] h-full">
          <ConversationSidebar />
        </div>
      </Modal>
      <Modal bindValue={showSettingsSidebar} direction="right">
        <div class="w-screen sm:w-[70vw] sm:max-w-[300px] h-full">
          <SettingsSidebar />
        </div>
      </Modal>
      <Modal bindValue={showConversationEditModal} direction="bottom" closeBtnClass="top-6 right-6">
        <div class="max-h-[70vh] w-full">
          <ConversationEditModal />
        </div>
      </Modal>
      <Modal bindValue={showEmojiPickerModal} direction="bottom" closeBtnClass="top-6 right-6">
        <div class="max-h-[70vh] w-full">
          <EmojiPickerModal />
        </div>
      </Modal>
      <Modal bindValue={showShareModal} direction="bottom" closeBtnClass="hidden">
        <div class="max-h-[70vh] w-full">
          <ShareModal />
        </div>
      </Modal>
      <Modal bindValue={showSelectMessageModal} direction="bottom" closeBtnClass="top-4 right-4" closeCallback={() => { showShareModal.set(true) }}>
        <div class="max-h-[70vh] w-full">
          <SelectMessageModal />
        </div>
      </Modal>
    </>
  )
}
