/*
 * @Author: BuXiongYu
 * @Date: 2025-04-16 15:17:58
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-16 17:17:06
 * @Description: 脚本 nonce 中间件
 */
import { NextFunction, Request, Response } from 'express'
import crypto from 'crypto'

async function scriptNonceMiddleware (req: Request, res: Response, next: NextFunction): Promise<void> {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://js.stripe.com;
    upgrade-insecure-requests;
  `

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(req.headers as unknown as any)

  requestHeaders.set('x-nonce', nonce)

  Object.assign(req.headers, requestHeaders)

  res.setHeader('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  next()
}

export default scriptNonceMiddleware