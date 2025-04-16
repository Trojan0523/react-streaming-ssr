<!--
 * @Author: BuXiongYu
 * @Date: 2025-04-16 22:56:47
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-16 23:09:13
 * @Description: 流式渲染 SSR with security config
-->

# 流式渲染 SSR with security config

- 一个基于 React Suspense 的流式服务端渲染（SSR）项目，集成了安全配置（CSP、SRI）。
- 反正就是想随便做个 demo, 对于之前 dan 的文章可以做个简单的小实践 <https://github.com/reactwg/react-18/discussions/37#top>


## 特性

- ⚡ 基于 React 19 和 Suspense 的流式 SSR 实现
- 🔒 内置安全策略（CSP、Script Nonce、SRI）
- 🌐 支持多种支付 SDK 集成（Stripe、Klarna、PayPal）
- 🔄 渐进式加载体验，骨架屏优先渲染
- 💻 开发环境实时热加载
- 🚀 生产环境优化

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
├── public/              # 静态资源目录
│   └── _react_streaming.js  # 流式渲染的客户端脚本
├── server/              # 服务器配置
│   └── middlewares/     # Express 中间件
│       └── script-nonce.middleware.ts  # CSP 和 Nonce 安全配置
├── src/                 # 源代码
│   ├── components/      # React 组件
│   │   ├── Comments.tsx    # 使用 Suspense 的延迟加载组件
│   │   ├── Layout.tsx      # 页面布局组件
│   │   ├── Post.tsx        # 主内容组件
│   │   ├── Skeleton.tsx    # 骨架屏组件
│   │   └── Spinner.tsx     # 加载指示器
│   ├── utils/           # 工具函数
│   │   └── sri/         # SRI (Subresource Integrity) 相关工具
│   ├── App.tsx          # 应用主组件
│   └── entry-server.tsx # SSR 入口点
├── server.ts            # Express 服务器
├── index.html           # HTML 模板
└── vite.config.ts       # Vite 配置
```

## 安全特性

- **内容安全策略 (CSP)**: 通过 Helmet 实现，限制加载的资源来源
- **Script Nonce**: 为脚本添加随机生成的 nonce 值，增强 CSP 的安全性
- **子资源完整性 (SRI)**: 通过 hash 验证第三方脚本的完整性

## 流式渲染如何工作

1. 服务器快速渲染并发送初始 HTML（带骨架屏）
2. 客户端接收并立即显示骨架屏
3. Suspense 组件异步加载内容
4. 数据加载完成后，服务器流式发送完整内容
5. 客户端无需刷新，平滑更新界面

## TODO

- [ ] tanstack route 接入
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 