import type { language } from '..'

export const fr = {
  name: 'fr',
  desc: 'Français',
  locales: {
    settings: {
      title: 'Paramètres',
      save: 'Enregistrer',
      general: {
        title: 'Général',
        requestWithBackend: 'Demande avec le backend',
        locale: 'Changer la langue du système',
      },
      openai: {
        title: 'OpenAI',
        key: '',
      },
      replicate: {},
    },
    conversations: {
      title: 'Conversations',
      add: 'Nouveau',
      recent: 'Récents',
      noRecent: 'No récents',
      untitled: 'Sans titre',
      promopt: {
        system: 'Info Système',
        desc: 'Vous êtes un assistant utile, répondez de manière aussi concise que possible ...',
      },
      emoji: 'Rechercher un emoji  ~',
      confirm: {
        title: 'Supprimer tous les messages de cette discussion',
        desc: 'Cette action ne peut pas être annulée.',
        message: 'Supprimer cet enregistrement',
        btn: 'confirmer',
        cancel: 'annuler',
        submit: 'soumettre',
      },
      share: {
        title: 'Partager la conversation',
        link: {
          title: 'Partager avec un lien',
          copy: 'Copier le lien',
          create: 'Créer un lien',
        },
        save: 'Enregistrer',
        copy: 'Copier le contexte',
        messages: {
          title: 'Sélectionner un message',
          selected: 'Messages sélectionnés',
          selectAll: 'Sélectionner tout',
        },
        tabs: {
          context: 'Partager le contexte',
          image: 'Partager l\'image',
        },
        image: {
          btn: 'Générer une image',
          open: 'Ouvrir dans un nouvel onglet',
          loading: 'Générer...',
          copy: 'Copier l\'image',
        },
      },
    },
    docs: 'Docs',
    github: 'Github',
    scroll: 'Défiler vers le bas',
    empty: 'Aucune donnée',
    send: {
      placeholder: 'Saisir quelque chose ...',
      button: 'Envoyer',
    },
    copyed: 'Copié',
  },
} as language
