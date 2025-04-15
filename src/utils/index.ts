/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 11:47:03
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 12:23:27
 * @Description: 请填写简介
 */
interface ILoadJsParams {
    integrity?: string,
    crossOrigin?: 'anonymous' | 'use-credentials',
    defer?: boolean,
}

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