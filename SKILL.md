---
name: astro-github-cloudflare-site-builder
version: 1.0.0
description: >
  通用型 AI Agent 网站开发 Skill。使用本地 AI Agent + Astro + Git/GitHub +
  Cloudflare Workers Builds 的工作流，从本地开发、验证、提交、推送到生产部署。
  开发者只需填写 CONFIG 区域中的项目参数，Agent 按本 Skill 执行。
---

# Astro + GitHub + Cloudflare Website Development Skill

Version: v1.0.0

## 0. Skill 目标

本 Skill 用于指导 AI Agent 开发、维护和发布基于以下技术流程的网站：

Local AI Agent
→ Astro
→ Git
→ GitHub
→ Cloudflare Workers Builds
→ Cloudflare Workers
→ Production Domain

核心原则：

1. 本地是开发主环境。
2. GitHub 是唯一代码与内容版本源。
3. `main` 是生产分支。
4. Cloudflare Workers 是生产运行环境。
5. 默认使用 Astro 静态生成 / 内容驱动架构。
6. 默认不引入数据库、CMS、VPS、Bunny CDN 或额外 CI/CD。
7. 只有在项目明确需要时，才增加数据库、API、CMS、第三方服务。
8. Agent 必须先验证，再 commit，再 push。
9. 不允许把密钥、Token、密码写入 Git。
10. 不得为了完成简单任务而重构整站或引入不必要的依赖。

---

# 1. DEVELOPER CONFIG

# =========================

# 开发者必须填写以下信息。

# 没有填写的项目，Agent 不得自行猜测关键参数。

# 非关键参数可以采用安全默认值。

## 1.1 Project

PROJECT_NAME: "[测试AI建站-1]"
PROJECT_DESCRIPTION: "[模仿www.jins.top网站，并创造更好的排版和内容网站]"
PROJECT_ROOT: "[F:\Agent\AI网站\黎金树-测试-jins.mokc.top]"

## 1.2 GitHub

GITHUB_OWNER: "[[jinstop](https://github.com/jinstop)]"
GITHUB_REPOSITORY: "[[web-jinsmokc](https://github.com/jason1699/web-jinsmokc)]"
GITHUB_DEFAULT_BRANCH: "main"

# 可选

GITHUB_REMOTE_URL: "[完整 Git remote URL；为空时 Agent 读取现有 git remote]"

## 1.3 Production

PRODUCTION_DOMAIN: "[www.jins.mokc.top]"
APEX_DOMAIN: "[jins.mokc.top]"
PRODUCTION_BRANCH: "main"

# 是否由 Cloudflare Workers Builds 自动部署

CLOUDFLARE_AUTO_DEPLOY: true

## 1.4 Cloudflare

CLOUDFLARE_ACCOUNT_ID: "[你推送到github后，后续我自己部署]"
CLOUDFLARE_WORKER_NAME: "[你推送到github后，后续我自己部署]"
CLOUDFLARE_ENVIRONMENT: "production"

# 是否要求 Agent 在本地直接执行 wrangler deploy

# 默认 false，因为 GitHub push 应触发 Cloudflare 自动部署

CLOUDFLARE_DIRECT_DEPLOY: false

## 1.5 Stack

ASTRO_VERSION_POLICY: "latest-compatible"
NODE_VERSION: "[填写项目要求，例如 22]"
PACKAGE_MANAGER: "npm"

# 默认：

# - Astro

# - TypeScript

# - CSS / Astro styling

# - Astro Content Collections / Content Layer

# - Cloudflare adapter / Workers deployment

# 

# 其他框架只有在项目明确要求时加入。

## 1.6 Content

CONTENT_MODEL: "[填写内容类型，如 pages/blog/products/hospitals/doctors]"
CONTENT_SOURCE: "astro-content"
CONTENT_DIRECTORY: "src/content"

## 1.7 SEO

SITE_NAME: "[填写网站名称]"
SITE_DESCRIPTION: "[填写默认站点描述]"
SITE_LOCALE: "en"
DEFAULT_OG_IMAGE: "[填写默认 OG 图片路径或 URL]"
SITEMAP_ENABLED: true
ROBOTS_ENABLED: true

## 1.8 Design

DESIGN_SYSTEM_SOURCE: "[填写设计参考、Figma、现有站点或品牌规范]"
PRIMARY_LANGUAGE: "[例如 en]"
SECONDARY_LANGUAGES: "[如无则填写 none]"
MOBILE_FIRST: true

## 1.9 External Services

# 只填写项目真正需要的服务。

# Agent 不得擅自增加服务。

FORMS_PROVIDER: "[none / 填写服务]"
ANALYTICS_PROVIDER: "[none / 填写服务]"
CRM_PROVIDER: "[none / 填写服务]"
DATABASE_PROVIDER: "[none / 填写服务]"
CMS_PROVIDER: "[none / 填写服务]"

---

# 2. Agent Role

你是本项目的 AI Website Engineer。

你的职责：

- 读取并理解现有项目
- 遵循现有架构和设计系统
- 使用 Astro 开发页面、组件和内容结构
- 维护 SEO、性能、响应式和可访问性
- 使用 Git 管理所有变更
- 在提交前执行验证
- 将完成且经过验证的代码推送至 GitHub
- 遵循 Cloudflare Workers 生产部署流程
- 避免无必要的技术复杂度

你的工作优先级：

1. 用户明确需求
2. 项目现有架构
3. 本 Skill
4. Astro / Cloudflare 官方最佳实践
5. 最小改动原则

---

# 3. 初始化项目时必须先检查

Agent 开始工作前，先检查：

```bash
pwd
git status
git branch --show-current
git remote -v
node -v
npm -v
```

然后检查项目：

```text
package.json
astro.config.*
wrangler.*
tsconfig.*
src/
public/
src/content/
.gitignore
README.md
```

如果项目已经存在：

- 不得重新初始化 Astro
- 不得覆盖现有配置
- 不得删除现有内容
- 先理解当前结构，再进行修改

如果项目不存在：

1. 创建 Astro 项目
2. 初始化 Git
3. 创建基础目录
4. 添加 Cloudflare Workers 配置
5. 建立 GitHub remote
6. 完成第一次验证
7. 再提交初始版本

---

# 4. 推荐项目结构

除非现有项目已经形成稳定结构，否则默认使用：

```text
project/
├── public/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── favicon.*
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   │
│   ├── content/
│   │   ├── pages/
│   │   ├── blog/
│   │   └── [project-specific collections]/
│   │
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── content.config.ts
│   └── data/
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── wrangler.jsonc
├── .gitignore
└── README.md
```

项目结构可以调整，但必须遵循：

- 页面与组件分离
- 内容与展示逻辑分离
- 可复用组件优先
- 不重复创建相同功能的组件
- 全局配置集中管理

---

# 5. 页面开发规则

每个页面优先遵循：

```text
Page
↓
Layout
↓
Reusable Components
↓
Content/Data
```

不要把整个页面写成一个超长 `.astro` 文件。

对于重复页面，建立数据模型 + 模板。

例如：

```text
content/
  hospital-a.md
  hospital-b.md
  hospital-c.md

pages/
  hospitals/
    [slug].astro
```

而不是：

```text
pages/
  hospitals/
    hospital-a.astro
    hospital-b.astro
    hospital-c.astro
```

---

# 6. 内容管理规则

默认优先使用 Astro Content Collections / Content Layer。

内容应尽可能结构化。

示例：

```yaml
---
title: "Example Title"
description: "Example description"
slug: "example-title"
featured: true
publishedAt: "2026-01-01"
image: "/images/example.jpg"
---
```

要求：

- schema 明确
- 字段命名一致
- slug 稳定
- 日期格式统一
- 图片路径有效
- SEO 字段完整
- 不在正文里重复保存可结构化的数据

当同一类页面超过 3 个时，优先考虑：

```text
Content Schema
+
Dynamic Route
+
Reusable Template
```

---

# 7. Astro 开发原则

优先：

- Static Site Generation
- Server-side rendering only when required
- Content-driven pages
- Reusable components
- Minimal client-side JavaScript
- TypeScript
- Semantic HTML

默认避免：

- React/Vue/Svelte 等额外框架
- 大型 UI 库
- 不必要的客户端状态
- 全局 JavaScript
- 过度依赖第三方脚本

只有明确的交互需求才添加客户端组件。

---

# 8. Cloudflare Workers 规则

本项目生产环境：

```text
GitHub
↓
Cloudflare Workers Builds
↓
Astro Build
↓
Wrangler Deploy
↓
Cloudflare Workers
```

默认：

```text
Build Command:
npx astro build

Deploy Command:
npx wrangler deploy
```

具体命令以项目当前 `package.json`、Astro 配置和 Cloudflare 配置为准。

原则：

- 不使用 Cloudflare Pages 作为新项目默认部署目标
- 不使用 VPS + Nginx 作为默认生产方案
- 不把 Cloudflare 仅当 DNS 使用
- 不重复配置另一套 CDN，除非项目明确需要

---

# 9. Git 工作流

## 9.1 分支

默认：

```text
main = production
feature/* = development
fix/* = bug fix
content/* = content update
```

复杂任务不要直接在 `main` 上开发。

例如：

```bash
git switch -c feature/hospital-template
```

完成后：

```bash
git add .
git commit -m "feat: improve hospital template"
git push -u origin feature/hospital-template
```

然后通过 GitHub Pull Request 合并到：

```text
main
```

---

# 10. Commit 规则

默认使用 Conventional Commits：

```text
feat: 新功能
fix: 修复问题
content: 内容更新
seo: SEO 更新
design: 视觉与样式更新
refactor: 重构
perf: 性能优化
docs: 文档
chore: 工程维护
```

例如：

```bash
git commit -m "feat: add hospital directory"
git commit -m "content: add cardiology service page"
git commit -m "seo: improve hospital metadata"
```

禁止：

```text
update
test
aaa
修改一下
final
final2
new
```

---

# 11. Push 前强制检查

在任何 push 前必须执行项目可用的检查。

最低要求：

```bash
npm install
npm run check
npm run build
```

如果项目没有 `check` script：

```bash
npx astro check
```

如果 package manager 不是 npm，则按照项目实际 package manager 执行。

此外检查：

```bash
git status
git diff --stat
```

必须确认：

- 无明显 TypeScript 错误
- 无 Astro build error
- 无 broken import
- 无明显 broken link
- 无明显图片 404
- 无意外删除
- 无密钥文件进入 Git
- 无大体积无意义文件
- 无调试代码
- 无 console.log 等开发残留（除非确有用途）

---

# 12. Secret / Security Rules

严禁提交：

```text
.env
.env.*
.dev.vars
.dev.vars.*
*.pem
*.key
credentials.*
service-account.*
```

以及：

```text
API keys
Access tokens
Passwords
Private keys
Cloudflare secrets
Database credentials
```

Agent 必须先检查：

```bash
git status
git diff --cached
```

如发现敏感信息：

1. 停止 commit
2. 移除敏感信息
3. 使用环境变量 / Cloudflare Secrets
4. 再继续

绝对禁止为了让构建通过而把真实 Secret 写进代码。

---

# 13. SEO 强制规则

默认每个公开页面都应该具备：

```text
title
meta description
canonical
h1
Open Graph
Twitter Card
```

站点默认应具备：

```text
robots.txt
sitemap.xml
favicon
404 page
```

结构化数据按页面类型选择，例如：

```text
Organization
WebSite
WebPage
Article
BreadcrumbList
Product
LocalBusiness
Person
```

仅在真实适用时使用，不得虚构结构化数据。

---

# 14. URL 规则

默认：

```text
小写
短
稳定
英文 slug
```

例如：

```text
/services/medical-concierge
/specialties/cardiology
/hospitals/example-hospital
/doctors/example-doctor
/blog/example-article
```

避免：

```text
/page?id=123
/test-page-2-final
/new-hospital-final-final
```

已上线 URL 不应无必要修改。

如果必须修改：

```text
旧 URL
↓
301
↓
新 URL
```

---

# 15. Responsive / UX Rules

默认：

```text
Mobile First
```

至少检查：

```text
Mobile
Tablet
Desktop
Large Desktop
```

优先保证：

- 导航可用
- CTA 可点击
- 字体可读
- 内容不溢出
- 图片不变形
- 表单可操作
- 触控区域合理
- 无横向滚动

不得只检查桌面端。

---

# 16. Performance Rules

默认追求：

- 少量 JS
- 优化图片
- 正确图片尺寸
- lazy loading
- 字体尽量少
- 避免不必要第三方脚本
- 避免巨大 bundle
- 避免重复请求
- 首屏内容优先

不得因为追求视觉效果而大量加入：

```text
动画库
视频背景
大型图片
第三方 tracking
复杂前端框架
```

除非项目明确要求。

---

# 17. Accessibility Rules

默认使用语义化 HTML：

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

图片必须有合理 `alt`。

表单必须有：

```text
label
keyboard accessibility
visible focus
error state
```

颜色对比度、按钮可读性和键盘操作需要基本可用。

---

# 18. 图片与资源规则

优先：

```text
WebP
AVIF
SVG
```

图片命名：

```text
descriptive-name.webp
```

避免：

```text
IMG_1234.jpg
image-final-final.webp
```

Agent 不应随意生成大量重复图片。

如果用户要求 AI 生成视觉素材，应保持：

- 页面用途明确
- 尺寸合适
- 品牌视觉一致
- 图片体积合理
- 文件名语义化

---

# 19. Design System Rules

开发新模块前先检查项目已有：

```text
Colors
Typography
Spacing
Buttons
Cards
Forms
Navigation
Container width
Border radius
Shadows
Icons
```

优先复用已有组件。

不要因为新页面而复制一套：

```text
Button2
ButtonNew
CardNew
HeroNew2
```

只有现有组件无法合理复用时才创建新组件。

---

# 20. AI Agent 修改原则

每次需求先判断：

```text
1. 是否已有组件？
2. 是否已有数据结构？
3. 是否已有样式？
4. 是否已有页面模板？
5. 是否能最小修改完成？
```

优先：

```text
Reuse
→ Extend
→ Refactor
→ New
```

而不是：

```text
New everything
```

禁止无授权执行：

- 删除整个目录
- 替换整个 UI 系统
- 升级大量依赖
- 更换框架
- 更换部署平台
- 更换数据库
- 更换 CMS
- 修改 DNS
- 修改域名
- 修改生产环境 Secret

除非这些变更正是当前任务的一部分。

---

# 21. 数据库 / CMS 启用条件

默认：

```text
DATABASE_PROVIDER = none
CMS_PROVIDER = none
```

只有出现以下需求之一才考虑：

- 高频实时数据
- 多人后台编辑
- 用户账户
- 订单系统
- 动态检索
- 权限体系
- 大规模外部数据
- 复杂 API

否则优先：

```text
Astro Content Collections
+
GitHub
```

---

# 22. 日常开发 SOP

每个任务按以下顺序执行：

## Step 1 — Understand

阅读：

```text
README
package.json
Astro config
Wrangler config
相关组件
相关内容
```

理解现有实现。

## Step 2 — Plan

确定：

```text
修改哪些文件
新增哪些文件
是否影响 URL
是否影响 SEO
是否影响现有组件
```

复杂任务先形成简短实施计划。

## Step 3 — Develop

在本地修改。

运行：

```bash
npm run dev
```

浏览器验证。

## Step 4 — Verify

执行：

```bash
npm run check
npm run build
```

并检查：

```bash
git diff
git status
```

## Step 5 — Commit

只有验证通过后：

```bash
git add .
git commit -m "type: description"
```

## Step 6 — Push

开发分支：

```bash
git push -u origin <branch>
```

生产分支：

```bash
git push origin main
```

仅当任务明确允许直接发布到生产环境时，才直接 push `main`。

## Step 7 — Deployment

如果：

```text
CLOUDFLARE_AUTO_DEPLOY = true
```

则默认等待 Cloudflare Workers Builds 自动构建。

Agent 不重复执行 `wrangler deploy`。

只有：

```text
CLOUDFLARE_DIRECT_DEPLOY = true
```

或用户明确要求手动部署时，才执行：

```bash
npx wrangler deploy
```

---

# 23. 失败处理

## Build Failure

先读取完整报错。

不要直接：

```text
升级所有依赖
删除 node_modules
重装全部包
修改 Cloudflare 配置
```

优先：

```text
定位错误
→ 修复具体文件
→ 重新 check
→ 重新 build
```

## Git Conflict

不要强制覆盖：

```bash
git push --force
```

除非用户明确授权。

默认：

```text
fetch
→ inspect
→ rebase/merge
→ resolve
→ test
→ push
```

## Cloudflare Deployment Failure

检查：

```text
Build command
Deploy command
Wrangler configuration
Node version
Environment variables
Secrets
Cloudflare account
```

不要直接更换平台。

---

# 24. Production Release Gate

任何进入 `main` 的代码，都必须满足：

```text
[ ] npm check 通过
[ ] npm build 通过
[ ] Git diff 已检查
[ ] 无 Secret
[ ] URL 无意外变化
[ ] SEO 无明显错误
[ ] Mobile 基本正常
[ ] Desktop 基本正常
[ ] 图片资源正常
[ ] Git commit 清晰
[ ] 生产发布范围明确
```

---

# 25. Agent Final Response Format

每次任务完成后，向开发者汇报：

```text
Task:
[完成了什么]

Changed:
[主要修改]

Validation:
- npm run check: PASS/FAIL
- npm run build: PASS/FAIL

Git:
- Branch: [branch]
- Commit: [commit]
- Push: SUCCESS/FAILED

Deployment:
- Cloudflare auto deploy: YES/NO
- Production URL: [URL]
```

如果失败：

```text
Status: BLOCKED

Reason:
[明确原因]

What was completed:
[已完成]

What remains:
[未完成]

Recommended next action:
[下一步]
```

不得声称已经部署，而实际上只完成了本地修改或 GitHub push。

---

# 26. Hard Rules

以下规则具有最高优先级：

1. 不猜关键配置。
2. 不泄露 Secret。
3. 不在未验证的情况下 push production。
4. 不使用 force push 覆盖未知历史。
5. 不擅自更换技术栈。
6. 不擅自引入数据库/CMS/VPS/CDN。
7. 不重复造轮子。
8. 不为简单需求进行大规模重构。
9. 不删除未知用途的现有代码。
10. 不声称完成了实际上没有完成的部署。
11. 所有生产变更必须可以通过 Git 历史追踪和回滚。
12. GitHub 是代码与内容的版本源。
13. Cloudflare Workers 是默认生产平台。
14. 本地 AI Agent 是默认开发入口。
15. 默认遵循“最小复杂度 + 可回滚 + 可验证”。

---

# 27. Quick Reference

```text
DEVELOPMENT

AI Agent
  ↓
Local Astro
  ↓
npm run dev
  ↓
check
  ↓
build
  ↓
git commit
  ↓
git push
  ↓
GitHub
  ↓
Cloudflare Workers Builds
  ↓
Cloudflare Workers
  ↓
Production
```

默认核心技术栈：

```text
Astro
TypeScript
Git
GitHub
Cloudflare Workers
Cloudflare Workers Builds
```

默认不使用：

```text
VPS
Nginx
宝塔
Cloudflare Pages
Bunny CDN
Database
CMS
GitHub Actions
```

除非项目配置或明确需求要求启用。

---

# 28. Version

Current version:

```text
v1.0.0
```

Versioning rule:

```text
MAJOR.MINOR.PATCH
```

- MAJOR：工作流或兼容性发生重大变化
- MINOR：增加新的能力或规则
- PATCH：修复文字、规则或示例，不改变核心工作流
