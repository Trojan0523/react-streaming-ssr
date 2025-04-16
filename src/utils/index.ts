/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 11:47:03
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 16:11:26
 * @Description: 请填写简介
 */
import { getSriConfig } from "./sri/utils"

interface ILoadJsParams {
    integrity?: string,
    crossOrigin?: 'anonymous' | 'use-credentials',
    defer?: boolean,
}
// 记录已失败的URL，避免重复尝试
const failedUrls = new Set<string>()

export function loadJs (src: string, params: ILoadJsParams = {}): Promise<{ cache?: boolean, error?: boolean }> {
    let script: HTMLScriptElement
    return new Promise(resolve => {
        // 服务端渲染
        if (!window.document) {
            resolve({ cache: false })
            return
        }
        console.log('loadJs', src)
        const getExist = window.document.querySelector(`script[src="${src}"]`) as HTMLScriptElement
        if (getExist) {
            script = getExist
        } else {
            const ref = window.document.getElementsByTagName('script')[0]
            console.log('ref', ref)
            script = window.document.createElement('script')
            script.src = src
            script.async = true
            script.onerror = function () {
                resolve({ error: true })
                // 错误上报
            }
            Object.entries(params).forEach(([key, value]) => {
                script.setAttribute(key, value)
            })
            if (params?.crossOrigin) {
                script.crossOrigin = params.crossOrigin
            }
            if (params?.integrity) {
                script.integrity = params.integrity
            }
            console.log('insertBefore', ref.parentNode)
            ref.parentNode?.insertBefore(script, ref)
        }
        const loaded = script.getAttribute('loaded')
        if (!loaded) {
            script.onload = function () {
                script.setAttribute('loaded', 'true')
                resolve({ cache: false })
            }
        } else {
            resolve({ cache: true })
        }
        
    })
}

export async function loadJsWithSRI (src: string, customParams: ILoadJsParams = {}): Promise<{ cache?: boolean, error?: boolean }> {
    // 获取SRI配置
    const sriConfig = getSriConfig(src)

    // 如果没有SRI配置或该URL已失败过，直接使用普通方式加载
    if (!sriConfig || failedUrls.has(src)) {
        return loadJs(src, customParams)
    }

    try {
        const result = await loadJs(src, {
            ...customParams,
            integrity: sriConfig.integrity,
            crossOrigin: sriConfig.crossOrigin
        })

        if (!result.error) {
            console.log(`SRI 校验通过: ${src}`, 'sri-success')
            return result
        }

        // 如果加载失败，且不是强制检查，尝试不使用SRI再次加载
        if (!sriConfig.strictCheck) {
            console.log(`SRI 校验失败，尝试不使用SRI: ${src}`, 'sri-fallback')
            // 将URL添加到失败集合，避免循环
            failedUrls.add(src)
            // 不使用SRI再次加载
            return loadJs(src, customParams)
        }
        // 严格检查模式下的失败，记录日志并返回错误
        console.log(`SRI 校验失败（严格模式）: ${src}`, 'sri-strict-failure')
        return { error: true }
    } catch (error) {
        // 发生异常，记录并返回错误
        console.log(`SRI 加载异常: ${src}, ${error}`, 'sri-error')
        // 如果不是强制检查，尝试不使用SRI再次加载
        if (!sriConfig.strictCheck) {
            failedUrls.add(src)
            return loadJs(src, customParams)
        }
      return { error: true }
    }
}

/**
 * 获取脚本的SRI哈希值
 * 这个函数通常在开发环境中使用，用于生成SRI配置
 *
 * @param url 脚本URL
 * @returns Promise<string> SRI哈希值
 */
export async function generateSRIHash (url: string): Promise<string> {
    if (!window.document) {
      return Promise.reject(new Error('仅客户端支持生成SRI哈希'))
    }
  
    try {
      // 使用fetch获取脚本内容
      const response = await fetch(url)
      const scriptContent = await response.text()
  
      // 使用SubtleCrypto API计算哈希
      const encoder = new TextEncoder()
      const data = encoder.encode(scriptContent)
      const hashBuffer = await crypto.subtle.digest('SHA-384', data)
  
      // 转换为base64
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      const hashBase64 = btoa(String.fromCharCode(...hashArray))
  
      return `sha384-${hashBase64}`
    } catch (error) {
      console.error('生成SRI哈希失败:', error)
      return Promise.reject(error)
    }
  }
  