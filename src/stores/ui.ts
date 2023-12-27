import { atom } from 'nanostores'
import type { ErrorMessage } from '@/types/message'

export const showConversationSidebar = atom(false)
export const showSettingsSidebar = atom(false)
export const showConversationEditModal = atom(false)
export const showEmojiPickerModal = atom(false)
export const showConfirmModal = atom(false)
export const showShareModal = atom(false)
export const showSelectMessageModal = atom(false)

export const isSendBoxFocus = atom(false)
export const currentErrorMessage = atom<ErrorMessage | null>(null)
export const emojiPickerCurrentPick = atom<string | undefined>()

export const scrollController = () => {
  const elementList = () => Array.from(document.getElementsByClassName('scroll-list'))
  return {
    scrollToTop: () => elementList().forEach(element => element.scrollTo({ top: 0, behavior: 'smooth' })),
    scrollToBottom: () => elementList().forEach(element => element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })),
    instantToBottom: () => elementList().forEach(element => element.scrollTo({ top: element.scrollHeight })),
  }
}
