// https://nuxt.com/docs/api/configuration/nuxt-config
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
export default defineNuxtConfig({
  // 把env放入这个里面，通过useRuntimeConfig获取
  vite: {
    envDir: '~/env', // 指定env文件夹
    optimizeDeps: {
      include: ['@babel/runtime/regenerator'],
      // 用于：从预捆绑中排除的依赖项
      exclude: []
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true
      }
    },
    plugins: [viteCommonjs(), esbuildCommonjs()]
  },
  build: {},
  css: ['@/assets/css/base.ignore.scss'],
  // 代理转发
  nitro: {
    preset: 'node-server',
    devProxy: {
      port: process.env.VITE_APP_PORT,
      host: true,
      open: true,
      '/api': {
        target: process.env.VITE_APP_BASE_URL,
        changeOrigin: true
      }
    }
  },
  modules: ['@vant/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
        // 其他 meta 标签...
      ],
      script: [
      ]

    }
  }
})
