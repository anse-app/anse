import type { language } from '..'

export const en = {
  name: 'en',
  desc: 'English',
  locales: {
    settings: {
      title: 'Settings',
      save: 'Save',
      general: {
        title: 'General',
        requestWithBackend: 'Request With Backend',
        locale: 'Change system language',
      },
      openai: {
        title: 'OpenAI',
        key: '',
      },
      replicate: {},
    },
    conversations: {
      title: 'Conversations',
      add: 'New',
      store: 'Prompt Store',
      recent: 'Recents',
      noRecent: 'No recents',
      untitled: 'Untitled',
      confirm: {
        title: 'Delete all messages in this chat',
        desc: 'This action cannot be undone.',
        message: 'Delete this record',
        btn: 'confirm',
        cancel: 'cancel',
      },
    },
    send: {
      placeholder: 'Enter Something...',
      button: 'Send',
    },
  },
} as language
