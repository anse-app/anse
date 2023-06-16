import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons(),
    presetTypography({
      cssExtend: {
        '*:first-child': {
          'margin-top': 0,
        },
        '*:last-child': {
          'margin-bottom': 0,
        },
        'h1': {
          'font-size': '1.25em',
          'margin': '1rem 0',
        },
        'h2': {
          'font-size': '1.16em',
          'margin': '1rem 0',
        },
        'h3': {
          'font-size': '1.1em',
          'margin': '1rem 0',
        },
        'h4, h5, h6': {
          'font-size': '1em',
          'margin': '1rem 0',
        },
        ':not(pre) > code': {
          'font-weight': 400,
          'padding': '0 0.2em',
          'color': 'var(--prism-keyword)',
        },
        'pre': {
          'background-color': 'var(--prism-background) !important',
        },
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  shortcuts: [{
    'bg-base': 'bg-white dark:bg-[#101010]',
    'bg-base-100': 'bg-light-200/50 dark:bg-[#181818]',
    'bg-base-200': 'bg-light-400 dark:bg-[#202020]',
    'bg-blur': 'bg-light-200/85 dark:bg-[#101010]/85 backdrop-blur-xl backdrop-saturate-150',
    'bg-sidebar': 'bg-white dark:bg-[#101010]',
    'bg-modal': 'bg-white dark:bg-[#181818]',
    'bg-darker': 'bg-black/4 dark:bg-white/4',
    'fg-base': 'text-dark dark:text-[#dadada]',
    'border-base': 'border-light-700 dark:border-[#2a2a2a]',
    'border-b-base': 'border-b-light-700 dark:border-b-[#2a2a2a]',
    'border-base-100': 'border-light-900 dark:border-[#404040]',
    'hv-base': 'transition-colors cursor-pointer hover:bg-darker',
    'hv-foreground': 'transition-opacity cursor-pointer op-70 hover:op-100',
    'input-base': 'bg-transparent placeholder:op-50 dark:placeholder:op-20 focus:(ring-0 outline-none) resize-none',
    'button': 'mt-4 px-3 py-2 text-xs border border-base rounded-lg hv-base hover:border-base-100',
    'emerald-button': 'button bg-emerald-600 !hover:bg-emerald-700 text-white',
    'emerald-light-button': 'button text-emerald-400 bg-emerald/12 !border-emerald-400 !hover-bg-emerald-600 !hover-border-emerald-600 !hover-text-light-700',
    'max-w-base': 'max-w-3xl mx-auto',
    'text-error': 'text-red-700 dark:text-red-400/80',
    'border-error': 'border border-red-700 dark:border-red-400/80',
    'text-info': 'text-gray-400 dark:text-gray-200',
    'menu-icon': 'cursor-pointer text-base fg-base hover-text-emerald-600',
    'fc': 'flex justify-center',
    'fi': 'flex items-center',
    'fcc': 'fc items-center',
    'fb': 'flex justify-between',
  }],
  preflights: [{
    layer: 'base',
    getCSS: () => `
      :root {
      --c-scroll: #d9d9d9;
      --c-scroll-hover: #bbbbbb;
      --c-shadow: #00000008;
      }

      html.dark {
        --c-scroll: #333333;
        --c-scroll-hover: #555555;
        --c-shadow: #ffffff08;
      }

      ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: var(--c-scroll);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--c-scroll-hover);
      }

      ::selection {
        background: rgba(0, 0, 0, 0.12);
      }

      .dark ::selection {
        background: rgba(255, 255, 255, 0.12);
      }

      button,select,input,option {
        outline: none;
        -webkit-appearance: none
      }
      img { display: initial; }
      .clipped {
        clip-path: inset(0 100% 0 0);
      }
    `,
  }],
})
