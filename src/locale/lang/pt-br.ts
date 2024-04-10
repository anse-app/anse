import type { language } from '..';

export const pt = {
  name: 'pt',
  desc: 'português',
  locales: {
    settings: {
      title: 'Configurações',
      save: 'Salvar',
      general: {
        title: 'Geral',
        requestWithBackend: 'Requisitar com o Backend',
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
      add: 'Novo',
      recent: 'Recentes',
      noRecent: 'Nenhuma recente',
      untitled: 'Sem título',
      prompt: {
        system: 'Informações do Sistema',
        desc: 'Você é um assistente útil, responda de forma concisa possível...',
      },
      emoji: 'Pesquisar um emoji ~',
      confirm: {
        title: 'Excluir todas as mensagens neste chat',
        desc: 'Esta ação não pode ser desfeita.',
        message: 'Excluir este registro',
        btn: 'Confirmar',
        cancel: 'Cancelar',
        submit: 'Enviar',
      },
      share: {
        title: 'Compartilhar Conversa',
        link: {
          title: 'Compartilhar com link',
          copy: 'Copiar Link',
          create: 'Criar Link',
        },
        save: 'Salvar',
        copy: 'Copiar Contexto',
        messages: {
          title: 'Selecionar Mensagem',
          selected: 'Mensagens Selecionadas',
          selectAll: 'Selecionar Tudo',
        },
        tabs: {
          context: 'Compartilhar Contexto',
          image: 'Compartilhar Imagem',
        },
        image: {
          btn: 'Gerar Imagem',
          open: 'Abrir em Nova Aba',
          loading: 'Gerando...',
          copy: 'Copiar Imagem',
        },
      },
    },
    docs: 'Documentos',
    github: 'Github',
    scroll: 'Rolar para o final',
    empty: 'Sem dados',
    send: {
      placeholder: 'Digite Algo...',
      button: 'Enviar',
    },
    copied: 'Copiado',
  },
} as language;
