/// <reference types="vitest/config" />
/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 08:11:42
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-17 20:14:56
 * @Description: 请填写简介
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { sri } from 'vite-plugin-sri3'
import crypto from 'crypto'

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
    cspNonce: crypto.randomBytes(16).toString('base64')
  },
})
