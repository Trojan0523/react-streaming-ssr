/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 16:28:16
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-16 09:59:19
 * @Description: 请填写简介
 */

import { ISriConfigMap } from "./utils";

/**
 * 支付SDK的SRI配置
 * 针对每个脚本URL提供对应的完整性哈希值
 *
 * 注意: 这些哈希值是示例，需要替换为实际的哈希值
 * 可以使用以下命令生成SHA-384哈希值:
 * curl -s https://js.stripe.com/v3/ | openssl dgst -sha384 -binary | openssl base64 -A
 * TODO: 放 redis同步
 */
export const paymentSriConfig: ISriConfigMap = {
    // Stripe SDK
    'https://js.stripe.com/v3/': {
       // 如果想验证对应的效果，可以将旁边的 hash 替换到下方，script 加载的时候会报错：sha384-y3Hh3Kg3FcudzNN9IWD6l65JwjhX8dEwPN5lvVAzekG6GNYta/FiZNQhSQwrmlkN%
      integrity: 'sha384-08eAvPsvKgxHtH8Af1RoaIY5jH2p0moh47zPwDKnjaRPP+/+wG2U/kL9g1SLdhDx',
      crossOrigin: 'anonymous',
      version: 'v3',
      strictCheck: false, // Stripe可能会定期更新，不要太严格
    },
  
    // Klarna SDK
    'https://x.klarnacdn.net/kp/lib/v1/api.js': {
      integrity: 'sha384-cZ8/WwE08xf1j9MoIIazh0RAoyKc3I/Y1HqwhZiVuTQd00d3LtvSOD7C25oTpKuT',
      crossOrigin: 'anonymous',
      version: 'v1',
      strictCheck: false,
    },
  
    // PayPal SDK
    'https://c.paypal.com/da/r/fb.js': {
      integrity: 'sha384-Ds/9jF/WfS+Hau3RkhoxlvZ526rKfeNoXndLbK9phdcgJHNq1/RP+q1Y9LahineQ',
      crossOrigin: 'anonymous',
      strictCheck: false,
    },
    // 未配置的SDK将使用默认行为（不使用SRI）
}