<p align="center">
  <img src="public/logo.svg" width="80" alt="WizDev Logo" />
</p>

<h1 align="center">🧙 WizDev</h1>

<p align="center">
  <strong>Your AI-Powered Developer Dashboard & Engineering Copilot</strong><br/>
  新一代 AI 驱动的研发效能控制台与智能助手
</p>

<p align="center">
  <a href="#features">Features / 功能特性</a> ·
  <a href="#quick-start">Quick Start / 快速开始</a> ·
  <a href="#ai-models">AI Models / AI 模型</a> ·
  <a href="#github-integration">GitHub Integration / 数据集成</a> ·
  <a href="#roadmap">Roadmap / 路线图</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black.svg" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue.svg" alt="React" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/self--hosted-✓-success" alt="Self Hosted" />
</p>

---

## ✨ Features / 功能特性

- 🤖 **AI Daily Briefing (过夜研发活动汇总)** — 自动总结团队过夜 Commit、PR 进展与构建状态，快速掌握项目全貌。
- 💬 **AI Copilot (智能研发助手)** — 原生支持自然的对话式提问，一键分析 PR 风险、生成站会日报、提炼周度效能。
- 📊 **Real-Time Developer Analytics (实时研发效能分析)** — 接入 GitHub API 真实数据，实时统计 Commit 趋势、代码评审耗时与 CI/CD 通过率。
- 🔀 **Smart PR Triage (合并请求智能审查)** — 智能排查等待评审的 PR，自动标出风险项与评审等待时长。
- ⚡ **CI/CD Build Pipelines (构建流水线监控)** — 实时查看各仓库的 GitHub Actions 工作流状态。
- 🧠 **Multi-Provider AI & Custom Proxy (多模型与自定义代理支持)** — 完美支持 OpenAI, DeepSeek, Google Gemini, Anthropic Claude 以及本地 Ollama；支持国内第三方反向代理/中转 URL 配置。
- 🌐 **Bilingual Support (双语界面)** — 完整支持 **中文 (CN)** / **English (EN)** 实时无缝切换。

---

## 🚀 Quick Start / 快速开始

### 1. Clone Repository / 克隆项目

```bash
git clone https://github.com/facke123/wizdev.git
cd wizdev
```

### 2. Install Dependencies / 安装依赖

```bash
npm install
```

### 3. Configure Environment Variables / 配置环境变量

复制 `.env.example` 并重命名为 `.env.local`：

```bash
cp .env.example .env.local
```

在 `.env.local` 中填入你的 GitHub 配置（如未填入将自动启用演示模式 Demo Mode）：

```env
GITHUB_TOKEN=github_pat_your_token_here
GITHUB_OWNER=facke123
GITHUB_REPOS=wizdev
```

### 4. Run Development Server / 启动开发服务

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可使用。

---

## 🧠 AI Models & Custom Base URLs / AI 模型与代理设置

WizDev 支持在系统设置中独立配置各个 Provider 的 API Key 与自定义中转 Base URL：

| Provider | Models 支持模型 | Local 本地模式 | Proxy / Base URL 支持 |
|----------|----------------|----------------|----------------------|
| **OpenAI** | `gpt-4o`, `gpt-4o-mini` | ❌ | ✅ (支持中转代理) |
| **DeepSeek** | `deepseek-chat`, `deepseek-coder` | ❌ | ✅ (支持官方/第三方中转) |
| **Google Gemini** | `gemini-2.5-flash`, `gemini-2.5-pro` | ❌ | ✅ (支持代理) |
| **Anthropic Claude** | `claude-3-5-sonnet`, `claude-3-opus` | ❌ | ✅ (支持代理) |
| **Ollama** | `llama3.1`, `qwen2.5`, `deepseek-r1` | ✅ | ✅ (`http://localhost:11434`) |

> 💡 **提示**：如果在设置页面填入 API Key 后提示 `403: Model not available in your region`，你可以直接在设置页面填入第三方代理地址，或者一键切换至 **DeepSeek** 服务。

---

## 🗺️ Roadmap / 路线图

- [x] 高颜值 Stripe 级深色 UI 与玻璃拟态设计 (Glassmorphism UI)
- [x] AI 高管每日研发简报 (AI Briefing Panel)
- [x] 真实 GitHub API 数据接入与 Demo Mode 降级保护
- [x] 多 AI 模型提供商与 API Key / 自定义 Base URL 持久化存储
- [x] 智能研发 Copilot 对话交互 (`/chat` 自然语言问答)
- [x] 中英文国际化 (i18n) 语言切换
- [x] 消除 React 19 Hydration Mismatch 及动画水合兼容
- [ ] GitHub OAuth 登录与多团队账号管理
- [ ] GitLab & Gitee 多平台代码库集成
- [ ] Slack / 微信 / 飞书 研发简报定时推送
- [ ] 周度/月度团队效能 PDF 报告导出

---

## 🛠️ Tech Stack / 技术栈

- **Core**: [Next.js 16.3](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Icons & Analytics**: GitHub REST API

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<p align="center">
  Built with ❤️ by WizDev Team
</p>
