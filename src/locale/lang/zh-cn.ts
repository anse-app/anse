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
      confirm: {
        title: '删除本会话的所有消息',
        desc: '这将删除本会话的所有消息，且不可恢复',
        message: '删除这条记录',
        btn: '确认',
        cancel: '取消',
      },
      share: {
        title: '分享对话',
        link: {
          title: '分享链接',
          copy: '复制链接',
          create: '创建链接',
        },
        save: '保存',
        copy: '复制上下文',
        messages: {
          title: '选择消息',
          selected: '已选择的消息',
          selectAll: '全选',
        },
        tabs: {
          context: '分享上下文',
          image: '分享图片',
        },
        image: {
          btn: '生成图片',
          open: '新窗口打开',
          loading: '生成中...',
          copy: '复制图片',
        },
      },
    },
    empty: '暂无数据',
    send: {
      placeholder: '输入内容...',
      button: '发送',
    },
    copyed: '已拷贝!',
  },
} as language
