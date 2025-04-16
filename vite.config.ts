/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 08:11:42
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-16 22:11:59
 * @Description: 请填写简介
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { sri } from 'vite-plugin-sri3'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sri()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // 不自动导入变量文件，避免路径问题
      },
    },
  },
  html: {
    cspNonce: 'nonce-react-suspense-ssr'
  },
})
