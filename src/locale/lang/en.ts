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
      add: 'New Conversation',
      recent: 'Recents',
      noRecent: 'No recents',
    },
  },
} as language
