/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 16:12:17
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 16:35:28
 * @Description: 请填写简介
 */
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import crypto from 'crypto'
import { paymentSriConfig } from './sri-config'

// 支持的哈希算法
type HashAlgorithm = 'sha256' | 'sha384' | 'sha512'

/**
 * 计算字符串的哈希值
 * @param content 内容
 * @param algorithm 哈希算法
 * @returns 哈希值
 */
function calculateHash (content: string, algorithm: HashAlgorithm): string {
    // crypto.createHash('sha384').update(fileContent).digest('base64');
    const hash = crypto.createHash(algorithm)
    hash.update(content)
    return `${algorithm}-${hash.digest('base64')}`
}

/**
 * 获取脚本内容并计算哈希值
 * @param url 脚本URL
 * @param algorithm 哈希算法
 * @returns 哈希值
 */
async function generateScriptHash (url: string, algorithm: HashAlgorithm = 'sha384'): Promise<string> {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch script from ${url}`)
        }

        const content = await response.text()
        return calculateHash(content, algorithm)
    } catch (error) {
        console.error(`获取脚本内容失败: ${url}`, error)
        throw error
    }
}

/**
 * 更新SRI配置文件
 * @param configPath 配置文件路径
 * @param newHashes 新的哈希值
 */
async function updateSriConfig (configPath: string, newHashes: Record<string, string>) {
    try {
        const configContent = fs.readFileSync(configPath, 'utf-8')
        // 使用正则表达式替换哈希值
        let updatedContent = configContent

        for (const [url, hash] of Object.entries(newHashes)) {
            const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`('${escapedUrl}':\\s*{[^}]*integrity:\\s*')([^']*)(')`, 'g')
            updatedContent = updatedContent.replace(regex, `$1${hash}$3`)
        }
        fs.writeFileSync(configPath, updatedContent, 'utf8')
        console.log('SRI配置文件更新成功')
    } catch (error) {
        console.error('更新SRI配置文件失败', error)
        throw error
    }
}

/**
 * 生成所有配置的脚本哈希值
 */
async function generateAllHashes () {
    const configPath = path.resolve(__dirname, 'sri-config.ts')
    const newHashes: Record<string, string> = {}
    // 获取所有需要计算哈希的URL
    const urls = Object.keys(paymentSriConfig)
    // 并行生成哈希
    await Promise.allSettled(urls.map(async (url) => {
        try {
            const hash = await generateScriptHash(url)
            newHashes[url] = hash
            console.log(`✅ 生成哈希值成功: ${url} -> ${hash}`)
            return { url, hash }
        } catch (e) {
            console.error(`❌ 生成哈希值失败: ${url}`, e)
            return null
        }
    }))

    // 更新配置文件
    if (Object.keys(newHashes).length > 0) {
        await updateSriConfig(configPath, newHashes)
    } else {
        console.warn('没有成功生成任何哈希值，配置文件未更新')
    }
}

/**
 * 主函数脚本运行
 */
async function main () {
    try {
        console.log('开始生成SRI哈希值...')
        await generateAllHashes()
        console.log('SRI哈希值生成完成')
      } catch (error) {
        console.error('SRI哈希值生成失败:', error)
        process.exit(1)
    }
}

if (require.main === module) {
    main()
}

export {
    generateAllHashes,
    generateScriptHash,
    updateSriConfig
}