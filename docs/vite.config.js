import { resolve } from 'path'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import colors from "tailwindcss/colors"
import { VitePWA as PWA } from 'vite-plugin-pwa'

export default defineConfig(async() => {
  return {
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
    },
    plugins: [
      // plugins
      Components({
        dirs: resolve(__dirname, '.vitepress/theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers:[
          IconsResolver({
            componentPrefix: 'icon',
          }),
        ],
        dts: './.vitepress/components.d.ts',
        transformer: 'vue3',
      }),
      Icons({
        compiler: 'vue3',
        defaultStyle: 'display: inline-block',
      }),
      PWA({
        outDir: '.vitepress/dist',
        manifest: {
          name: 'Lumiere',
          short_name: 'Lumiere',
          theme_color: colors.amber[500],
          icons: [
            {
              src: '/fire.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/fire.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      Inspect(),
    ],
    resolve: {
      alias: {
        '@vueuse/docs-utils': resolve(__dirname, '.vitepress/plugins/utils.ts'),
      },
      dedupe: [
        'vue',
      ],
    },
  }
})
