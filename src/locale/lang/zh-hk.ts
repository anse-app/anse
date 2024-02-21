import type { language } from '..'

export const zhHK = {
  name: 'zhHK',
  desc: '繁體中文',
  locales: {
    settings: {
      title: '設定',
      save: '儲存',
      general: {
        title: '通用',
        requestWithBackend: '請求代理後端',
        locale: '切換語言',
      },
      openai: {
        title: 'OpenAI',
        key: '',
      },
      replicate: {},
    },
    conversations: {
      title: '對話列表',
      add: '新增對話',
      recent: '最近對話',
      noRecent: '暫無最近對話',
      untitled: '未命名對話',
      promopt: {
        system: '系統訊息',
        desc: '你是個樂於助人的助手，回答盡量簡潔...',
      },
      emoji: '搜尋表情符號 ~',
      confirm: {
        title: '刪除本會話的所有訊息',
        desc: '這將刪除本會話的所有訊息，且不可恢復',
        message: '刪除這條記錄',
        btn: '確認',
        cancel: '取消',
        submit: '提交',
      },
      share: {
        title: '分享對話',
        link: {
          title: '分享連結',
          copy: '複製連結',
          create: '建立連結',
        },
        save: '儲存',
        copy: '複製內容',
        messages: {
          title: '選擇訊息',
          selected: '已選擇的訊息',
          selectAll: '全選',
        },
        tabs: {
          context: '分享內容',
          image: '分享圖片',
        },
        image: {
          btn: '產生圖片',
          open: '在新視窗中開啟',
          loading: '產生中...',
          copy: '複製圖片',
        },
      },
    },
    docs: '文件',
    github: '原始碼',
    scroll: '滾動到底部',
    empty: '暫無資料',
    send: {
      placeholder: '輸入內容...',
      button: '發送',
    },
    copyed: '已複製!',
  },
} as language
