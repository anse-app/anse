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
      recent: 'Recents',
      noRecent: 'No recents',
      untitled: 'Untitled',
      promopt: {
        system: 'System Info',
        desc: 'You are a helpful assistant, answer as concisely as possible...',
      },
      emoji: 'Search an emoji ~',
      confirm: {
        title: 'Delete all messages in this chat',
        desc: 'This action cannot be unback.',
        message: 'Delete this record',
        btn: 'confirm',
        cancel: 'cancel',
        submit: 'submit',
      },
      share: {
        title: 'Share Conversation',
        link: {
          title: 'Share with link',
          copy: 'Copy Link',
          create: 'Create Link',
        },
        save: 'Save',
        copy: 'Copy Context',
        messages: {
          title: 'Select Message',
          selected: 'Selected Messages',
          selectAll: 'Select All',
        },
        tabs: {
          context: 'Share Context',
          image: 'Share Image',
        },
        image: {
          btn: 'Generate Image',
          open: 'Open in New Tab',
          loading: 'Generating...',
          copy: 'Copy Image',
        },
      },
    },
    docs: 'Docs',
    github: 'Github',
    scroll: 'Scroll to bottom',
    empty: 'No data',
    send: {
      placeholder: 'Enter Something...',
      button: 'Send',
    },
    copyed: 'Copied',
  },
} as language
