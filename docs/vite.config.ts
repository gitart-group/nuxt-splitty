import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    Components({
      include: [/\.vue/, /\.md/],
      dirs: [
        '.vitepress/components',
        '.vitepress/components/Code',
      ],
      dts: '.vitepress/components.d.ts',
    }),
    Unocss({
      shortcuts: [
        ['btn', 'inline-flex items-center justify-center py-2 px-5 rounded-lg transition bg-gray-100 hover:bg-gray-200 :dark:bg-gray-400 dark:bg-opacity-20 dark:hover:bg-opacity-40 border-1 border-solid border-transparent'],
        ['btn--active', 'border-primary'],
        ['btn--primary', 'bg-primary hover:bg-primary-dark text-white font-semibold dark:bg-green-600 dark:hover:bg-green-500 dark:text-black'],
        ['btn--outline-gray', 'border-1 border-solid border-gray-300'],
      ],
      theme: {
        colors: {
          'primary': '#42b883',
          'primary-dark': '#33a06f',
        },
      },
      presets: [
        presetUno({
          dark: 'media',
        }),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),
  ],
})
