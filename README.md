# web-jinsmokc

Astro 静态站 + Cloudflare Workers 部署配置。

本文件只记录**工程配置与操作方式**，不含项目介绍、品牌信息或内容说明。

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
| 部署 | Cloudflare Workers Static Assets |
| 依赖管理 | npm（Node ≥ 22） |

**不引入**：数据库、CMS、VPS/Nginx、Bunny CDN、GitHub Actions、前端框架（React/Vue）。

> **关于 `@astrojs/cloudflare`**：本站是纯静态（`output: 'static'`，全站预渲染），
> **不使用** cloudflare adapter。误加该 adapter 会让构建产出 `_worker.js/` 空壳目录，
> 导致 `wrangler deploy` 报错 `Uploading a Pages _worker.js directory as an asset`。
> 纯静态托管只需 `wrangler.jsonc` 中的 `assets.directory = "./dist"`，无需 worker 入口。

## 部署

### 预览环境

```bash
npm run build && npx wrangler deploy --dry-run
```

`--dry-run` 是验证部署配置的有效手段，能在本地抓出 build 阶段看不到的阻塞点。

### 生产环境（Cloudflare Workers Builds）

1. 在 Cloudflare Dashboard 创建 Workers Builds 项目，连接本仓库
2. 构建配置：

```text
Build command   : npm run build
Deploy command  : npx wrangler deploy
Root directory  : /
```

3. 环境变量（Settings → Builds & deployments → Variables）：

| 变量 | 值 |
|---|---|
| `NODE_VERSION` | `22` |

4. 部署完成后在 Cloudflare 绑定自定义域

### 手动部署

在 `.dev.vars` 或环境变量中配置 `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID`，然后：

```bash
npm run build
npm run deploy
```

> 凭据只走环境变量或 Cloudflare Secrets，**严禁**写入 `wrangler.jsonc` 或任何入库文件。

## 部署故障速查

| 报错 | 根因 | 处理 |
|---|---|---|
| `npm error Invalid Version:` | `package-lock.json` 中存在只写 `optional: true`、缺 `version`/`resolved` 的损坏条目（多由本地安装被中断产生） | 先移出 `node_modules`，删除 `package-lock.json`，再重新 `npm install` |
| `Uploading a Pages _worker.js directory as an asset` | 纯静态站误用 cloudflare adapter，产出空壳 worker | 移除 adapter 与 `wrangler.jsonc` 的 `main` 字段 |
| `The package "@cloudflare/workerd-linux-64" could not be found` | 安装时用了 `--no-optional` | 去掉该 flag，让 optionalDependencies 装上平台二进制 |
| `Cannot find package '@capsizecss/unpack'` | 同上，optional 包缺失 | 同上 |

## 目录结构

```text
.
├── public/                     # 静态资源（favicon / robots.txt / manifest）
├── src/
│   ├── components/
│   │   ├── common/             # Header / Footer / Seo
│   │   ├── sections/           # 页面级区块
│   │   └── ui/                 # 通用 UI 组件
│   ├── content/notes/          # Markdown 内容集合
│   ├── data/                   # 站点与资料数据（改文案只动这里）
│   ├── layouts/BaseLayout.astro
│   ├── pages/                  # 路由
│   ├── styles/global.css       # 设计系统 token
│   └── content.config.ts       # 内容集合 schema
├── _备份/                       # 本地备份（不入 Git）
├── 修改记录.md                  # 变更记录（倒序）
├── astro.config.mjs
├── wrangler.jsonc              # Cloudflare Workers 配置
└── package.json
```

## 内容管理

在 `src/content/notes/` 创建 `.md` 文件，**文件名即 URL slug**（英文小写短横线）。

```markdown
---
title: "标题"
description: "用于卡片摘要与 SEO description"
slug: "english-slug"
date: 2026-01-01
tags: ["标签A", "标签B"]
featured: false
draft: false
---

正文 Markdown。
```

字段定义见 `src/content.config.ts`。`draft: true` 的内容不参与构建。

## 收录控制

`public/robots.txt` 当前为全站禁止爬取：

```
User-agent: *
Disallow: /
```

如需恢复收录：改为 `Allow: /` 并加回 Sitemap 行。

## Git 约定

| 分支 | 用途 |
|---|---|
| `main` | 生产分支，每次 push 触发自动部署 |
| `feature/*` | 功能开发 |
| `content/*` | 内容更新 |
| `fix/*` | 问题修复 |

Commit 采用 Conventional Commits：`feat:` / `fix:` / `content:` / `seo:` / `design:` / `refactor:` / `perf:` / `docs:` / `chore:`

## 版本记录

**每次变更必须在 [`修改记录.md`](./修改记录.md) 留档，按时间倒序排列（最新在最上）。**

每一条记录包含：

```text
## vX.Y.Z — YYYY-MM-DD HH:mm

类型       变更性质（初始化 / 功能 / 修复 / 配置变更 …）
备份路径   _备份/<版本号>/
基线版本   上一个版本号

变更内容   做了什么、为什么
修改文件   文件清单与改动点
验证结果   check / build / 其他验证的实际结果
Git        分支、commit、push 状态
```

版本号规则为 `MAJOR.MINOR.PATCH`，每次修改递增 PATCH 位。

本地备份位于 `_备份/<版本号>/`（已 gitignore，不入库），与记录一一对应，用于回滚。

## 推前检查清单

```bash
npm run check && npm run build && git status && git diff --stat
```

- [ ] 类型检查与构建通过
- [ ] 无 Secret / `.env` / `.dev.vars` 进入 Git
- [ ] 无 `console.log` 调试残留
- [ ] 内链有效，图片不 404
- [ ] 已有 URL 未意外变更
- [ ] `修改记录.md` 已追加本轮记录
