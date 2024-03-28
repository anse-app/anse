import type { language } from '..'

export const pt = {
  name: 'pt',
  desc: 'Português',
  locales: {
    settings: {
      title: 'Configurações',
      save: 'Salvar',
      general: {
        title: 'Geral',
        requestWithBackend: 'Requisitar com Backend',
        locale: 'Alterar idioma do sistema',
      },
      openai: {
        title: 'OpenAI',
        key: '',
      },
      replicate: {},
    },
    conversations: {
      title: 'Conversas',
      add: 'Nova',
      recent: 'Recentes',
      noRecent: 'Sem recentes',
      untitled: 'Sem título',
      promopt: {
        system: 'Informações do Sistema',
        desc: 'Você é um assistente prestativo, responda da forma mais concisa possível...',
      },
      emoji: 'Pesquisar um emoji ~',
      confirm: {
        title: 'Excluir todas as mensagens nesta conversa',
        desc: 'Esta ação excluirá todas as mensagens nesta conversa e não pode ser desfeita',
        message: 'Excluir este registro',
        btn: 'Confirmar',
        cancel: 'Cancelar',
        submit: 'Enviar',
      },
      share: {
        title: 'Compartilhar Conversa',
        link: {
          title: 'Compartilhar com link',
          copy: 'Copiar link',
          create: 'Criar link',
        },
        save: 'Salvar',
        copy: 'Copiar Contexto',
        messages: {
          title: 'Selecionar mensagem',
          selected: 'Mensagens selecionadas',
          selectAll: 'Selecionar tudo',
        },
        tabs: {
          context: 'Compartilhar Contexto',
          image: 'Compartilhar imagem',
        },
        image: {
          btn: 'Gerar imagem',
          open: 'Abrir em nova guia',
          loading: 'Gerando...',
          copy: 'Copiar imagem',
        },
      },
    },
    docs: 'Documentos',
    github: 'Github',
    scroll: 'Rolar até o final',
    empty: 'Sem dados',
    send: {
      placeholder: 'Digite algo...',
      button: 'Enviar',
    },
    copied: 'Copiado!',
  },
} as language

