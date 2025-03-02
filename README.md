# WebSocket 测试工具

一个现代化的 WebSocket 测试工具，类似于 Postman，但专为 WebSocket 连接设计。

## 功能特点

- **项目管理**：创建和管理多个 WebSocket 项目
- **WebSocket 连接**：连接到不同的 WebSocket 服务器
- **信令管理**：保存和复用常用的 WebSocket 信令
- **消息记录**：查看发送和接收的 WebSocket 消息
- **现代化界面**：友好的用户界面和交互体验
- **深色模式**：支持深色模式，减少眼睛疲劳

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Zustand (状态管理)
- React Router
- Headless UI

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览构建

```bash
npm run preview
```

## 部署

项目使用 Cloudflare Workers 进行部署：

```bash
npm run deploy
```

## 使用说明

1. 创建新项目并设置 WebSocket URL
2. 连接到 WebSocket 服务器
3. 创建和管理常用信令
4. 发送自定义消息或保存的信令
5. 查看发送和接收的消息历史

## 贡献

欢迎提交 Pull Request 或提出 Issue！
