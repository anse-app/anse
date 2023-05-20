import type { language } from '..'

export const zhCN = {
  name: 'zhCN',
  desc: '简体中文',
  locales: {
    settings: {
      title: '设置',
      save: '保存',
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
      title: '对话列表',
      add: '新对话',
      recent: '最近对话',
      noRecent: '暂无最近对话',
      untitled: '未命名对话',
    },
    send: {
      placeholder: '输入内容...',
    },
  },
} as language
