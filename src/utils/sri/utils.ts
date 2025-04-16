/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 15:59:30
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 16:29:18
 * @Description: 请填写简介
 */

import { paymentSriConfig } from "./sri-config";

// SRI配置接口
export interface ISriConfig {
    /**
     * 完整性哈希值
     */
    integrity: string;
    /**
     * 跨域策略
     */
    crossOrigin: 'anonymous' | 'use-credentials';
    /**
     * 是否强制检查（如果为false，加载失败时会尝试不使用SRI再次加载）
     */
    strictCheck?: boolean;
    /**
     * 版本信息，用于日志
     */
    version?: string;
}

// SRI配置映射
export interface ISriConfigMap {
    [key: string]: ISriConfig;
}



export function getSriConfig (url: string): ISriConfig | undefined {
    return paymentSriConfig[url]
}