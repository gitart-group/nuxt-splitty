import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Nuxt Splitty',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/favicon.png',

    algolia: null,

    footer: {
      message: 'For Internal Use Only',
      copyright: '',
    },

    nav: [
      {
        text: 'Setup',
        link: '/guide/setup',
      },
      {
        text: 'Module Info',
        link: '/guide/module/info',
      },
      {
        text: 'Theme Info',
        link: '/guide/module/theming',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            {
              text: 'Introduction',
              link: '/guide/introduction',
            },
            {
              text: 'Setup',
              link: '/guide/setup',
            },
            {
              text: 'Usage',
              link: '/guide/usage',
            },
            {
              text: 'Options',
              link: '/guide/options',
            },
          ],
        },
        {
          text: 'Module',
          items: [
            {
              text: 'Information',
              link: '/guide/module/info',
            },
            {
              text: 'Configuration',
              link: '/guide/module/config',
            },
            {
              text: 'Layouts',
              link: '/guide/module/layouts',
            },
            {
              text: 'Middleware',
              link: '/guide/module/middleware',
            },
            {
              text: 'I18n',
              link: '/guide/module/i18n',
            },
            {
              text: 'Theming',
              link: '/guide/module/theming',
            },
          ],
        },
      ],
    },
  },
})
