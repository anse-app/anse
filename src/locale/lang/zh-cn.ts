import type { language } from '..'

export const zhCN = {
  name: 'zhCN',
  desc: '简体中文',
  locales: {
    settings: {
      btn: 'TEST',
      general: {
        title: '通用',
        requestWithBackend: '请求代理后端',
        locale: '切换语言',
      },
      openai: {
        title: 'OpenAI',
        key: '',
      },
      replicate: {},
    },
    conversations: {
      title: 'CONVERSATIONS',
    },
  },
} as language
