import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { injectHtml, minifyHtml } from 'vite-plugin-html'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: mode === 'production' ? '/course-digital-image-processing/' : '/',
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      minifyHtml(),
      injectHtml({
        injectData: {
          title: env.VITE_PAGE_TITLE || 'DIP',
          description: env.VITE_PAGE_DESCRIPTION || 'DIP',
        },
      }),
    ],
  }
})
