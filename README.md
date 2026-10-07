# 黎金树 · 数字营销师

> 实用主义的出海营销与品牌增长方案。
> 参考 [www.jins.top](https://www.jins.top) 重构，改进信息层级与排版。

Astro 静态站 · Cloudflare Workers 部署 · GitHub 作为唯一版本源

---

## 快速开始

```bash
npm install
npm run dev      # 本地开发，默认 http://localhost:4321
npm run check    # TypeScript + Astro 类型检查
npm run build    # 构建静态产物到 dist/
npm run preview  # 预览构建结果
```

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Astro 5（Static Output） |
| 语言 | TypeScript（strict） |
| 样式 | 原生 CSS + 设计 token（`src/styles/global.css`） |
| 内容 | Astro Content Layer（`src/content/notes`） |
| 适配器 | `@astrojs/cloudflare` |
| 部署 | Cloudflare Workers（Static Assets） |
| 依赖管理 | npm（Node ≥ 22） |

**不引入**：数据库、CMS、VPS/Nginx、Bunny CDN、GitHub Actions、前端框架（React/Vue）。

## 目录结构

```text
.
├── public/                     # 静态资源（favicon / robots.txt / manifest）
├── src/
│   ├── components/
│   │   ├── common/             # Header / Footer / Seo
│   │   ├── sections/           # 页面级区块（Hero/Skills/Timeline/Services…）
│   │   └── ui/                 # 通用 UI（Button/Card/SectionHeading/Stats）
│   ├── content/notes/          # Markdown 笔记（内容集合）
│   ├── data/                   # 站点与个人资料数据（改文案只动这里）
│   ├── layouts/BaseLayout.astro
│   ├── pages/                  # 路由
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── notes/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── styles/global.css       # 设计系统 token 与基础样式
│   └── content.config.ts       # 内容集合 schema
├── _备份/                       # 本地备份（不入 Git）
├── 修改记录.md                  # 变更记录（倒序）
├── astro.config.mjs
├── wrangler.jsonc              # Cloudflare Workers 配置
└── package.json
```

## 内容管理

新增一篇笔记：在 `src/content/notes/` 创建 `.md` 文件，文件名即 URL slug（用英文小写短横线）。

```markdown
---
title: "文章标题"
description: "用于卡片摘要与 SEO description"
slug: "english-slug"
date: 2026-01-01
tags: ["标签A", "标签B"]
featured: false
draft: false
---

正文 Markdown。
```

字段定义见 `src/content.config.ts`。`draft: true` 的文章不会出现在列表与构建中。

## 部署

### 方式一：Cloudflare Workers Builds（推荐，本项目采用）

1. 在 Cloudflare Dashboard 创建 Workers Builds 项目，连接 GitHub 仓库 `jinstop/web-jinsmokc`
2. 配置：

```text
Build command   : npm run build
Deploy command  : npx wrangler deploy
Root directory  : /
```

3. 环境变量（Settings → Builds & deployments → Variables）：

| 变量 | 值 |
|---|---|
| `NODE_VERSION` | `22` |

4. 部署完成后在 Cloudflare 添加自定义域 `www.jins.mokc.top`

### 方式二：本地手动部署

需先在 `.dev.vars` 或环境变量中配置 `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID`，然后：

```bash
npm run build
npm run deploy
```

> 凭据只走环境变量或 Cloudflare Secrets，**严禁**写入 `wrangler.jsonc` 或任何入库文件。

### 域名映射

| 域名 | 指向 |
|---|---|
| `www.jins.mokc.top` | Worker（主域） |
| `jins.mokc.top` | 301 → `www` |

## Git 约定

| 分支 | 用途 |
|---|---|
| `main` | 生产分支，每次 push 触发自动部署 |
| `feature/*` | 功能开发 |
| `content/*` | 内容更新 |
| `fix/*` | 问题修复 |

Commit 采用 Conventional Commits：`feat:` / `fix:` / `content:` / `seo:` / `design:` / `refactor:` / `perf:` / `docs:` / `chore:`

## 推前检查清单

```bash
npm run check && npm run build && git status && git diff --stat
```

- [ ] 类型检查与构建通过
- [ ] 无 Secret / `.env` / `.dev.vars` 进入 Git
- [ ] 无 `console.log` 调试残留
- [ ] SEO 信息（title / description / canonical / OG）完整
- [ ] 移动端与桌面端布局正常
- [ ] 内链有效，图片不 404
- [ ] 已有 URL 未意外变更

## 修改记录

所有变更记录在 [`修改记录.md`](./修改记录.md)，按时间倒序排列。本地备份在 `_备份/<版本号>/`，与记录一一对应。
