<!--
 * @Author: BuXiongYu
 * @Date: 2025-04-17 11:35:40
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-17 11:38:35
 * @Description: 请填写简介
-->
# 安全测试计划

## 1. 内容安全策略 (CSP) 测试

- **浏览器测试**：打开网站，使用浏览器开发者工具检查网络标头，确认 Content-Security-Policy 标头是否正确设置
- **CSP 评估工具**：使用如 [CSP Evaluator](https://csp-evaluator.withgoogle.com/) 或 [Report URI's CSP Builder](https://report-uri.com/home/tools) 分析您的 CSP 配置
- **手动注入测试**：尝试在页面上注入内联脚本或样式，确认被 CSP 阻止

## 2. 子资源完整性 (SRI) 测试

- **验证 SRI 哈希**：检查第三方脚本 (Stripe, Klarna, PayPal) 是否正确应用了 integrity 和 crossOrigin 属性
- **篡改测试**：尝试修改 SRI 哈希值，确认加载失败
- **备用加载测试**：对于 strictCheck:false 的资源，验证备用加载机制是否正常工作

## 3. Helmet 中间件配置测试

- **HTTP 头部验证**：验证以下安全标头是否正确设置：
  - Content-Security-Policy
  - X-Content-Type-Options
  - X-Frame-Options
  - X-XSS-Protection
  - Referrer-Policy
- **自动化测试工具**：使用 [OWASP ZAP](https://www.zaproxy.org/) 或 [Mozilla Observatory](https://observatory.mozilla.org/) 扫描您的网站

## 4. Nonce 安全测试

- **验证 nonce 生成**：确认每个请求都生成了唯一的 nonce 值
- **页面分析**：检查页面源代码，确认所有脚本和样式标签都包含正确的 nonce 属性
- **nonce 绕过测试**：尝试注入没有 nonce 的脚本，确认被阻止

## 5. 自动化安全测试

建议设置以下自动化测试：

1. **单元测试**：

   ```
   tests/security/
   ├── sri.test.js      // 测试 SRI 哈希生成和验证逻辑
   ├── csp.test.js      // 测试 CSP 配置生成
   └── nonce.test.js    // 测试 nonce 生成和应用逻辑
   ```

2. **集成测试**：测试整个安全中间件链，确保正确应用安全头部

3. **端到端测试**：模拟真实浏览器行为，验证安全策略的实际效果

## 6. 安全漏洞扫描

- 使用 [Snyk](https://snyk.io/) 或 [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) 检查依赖项安全漏洞
- 定期运行 `npm audit` 并解决发现的安全问题

## 7. XSS 和 CSRF 防护测试

- **XSS 测试**：尝试在输入字段中注入恶意脚本，验证是否被过滤或转义
- **CSRF 测试**：验证表单是否使用 CSRF 令牌保护

## 8. 配置渗透测试环境

- 设置与生产环境类似的测试环境
- 使用工具如 OWASP ZAP、Burp Suite 进行渗透测试
- 记录并修复发现的安全问题

## 测试优先级建议

1. CSP 和 HTTP 安全头部测试（高优先级）
2. SRI 验证测试（高优先级）
3. XSS 和注入测试（高优先级）
4. 自动化安全扫描（中优先级）
5. 渗透测试（中优先级）

## 工具推荐

- **浏览器工具**：Chrome DevTools, Firefox Developer Tools
- **自动化安全测试**：Vitest, Mocha + Chai
- **安全扫描**：OWASP ZAP, Mozilla Observatory, Snyk
- **HTTP 分析**：Postman, Insomnia
