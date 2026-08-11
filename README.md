<p align="center">
  <img src="public/logo.svg" width="80" alt="WizDev Logo" />
</p>

<h1 align="center">🧙 WizDev</h1>

<p align="center">
  <strong>Your AI-Powered Developer Dashboard</strong>
</p>

<p align="center">
  AI-generated daily briefs · Smart PR triage · Team velocity insights · Self-hosted & open source
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#ai-models">AI Models</a> ·
  <a href="#screenshots">Screenshots</a> ·
  <a href="#roadmap">Roadmap</a> ·
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/self--hosted-✓-success" alt="Self Hosted" />
</p>

---

## ✨ Features

- 🤖 **AI Daily Briefing** — Wake up to an AI-generated summary of what happened overnight in your repos
- 📊 **Developer Analytics** — Track your coding velocity, review efficiency, and contribution patterns
- 💬 **Chat with Your Data** — Ask questions like *"Which PRs are blocking the release?"* or *"Write my standup report"*
- 🔀 **Smart PR Triage** — AI-powered risk scoring and priority suggestions for pull requests
- ⚡ **CI/CD Overview** — Real-time build status across all your repositories
- 🏠 **Self-Hosted** — Your data stays yours. One-command Docker deploy.
- 🧠 **Multi-Model Support** — OpenAI, DeepSeek, Google Gemini, Anthropic Claude, or Ollama (local)

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
docker compose up -d
# Open http://localhost:3000
```

### Option 2: Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/wizdev.git
cd wizdev

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your GitHub token and AI API keys

# Run development server
npm run dev
# Open http://localhost:3000
```

## 🧠 AI Models

WizDev supports multiple AI providers. Configure your preferred model in Settings.

| Provider | Models | Local? | API Key Required |
|----------|--------|--------|-----------------|
| **OpenAI** | GPT-4o, GPT-4o-mini | ❌ | ✅ |
| **DeepSeek** | DeepSeek V3, DeepSeek Coder | ❌ | ✅ |
| **Google Gemini** | Gemini 2.5 Pro, Gemini 2.5 Flash | ❌ | ✅ |
| **Anthropic Claude** | Claude Opus 4, Claude Sonnet 4 | ❌ | ✅ |
| **Ollama** | Llama 3.1, Qwen 2.5, Mistral, CodeLlama | ✅ | ❌ |

## 📸 Screenshots

> *Coming soon — the dashboard is under active development!*

## 🗺️ Roadmap

- [x] Dashboard layout with glassmorphism design
- [x] AI Daily Briefing panel
- [x] Pull Request list with status tracking
- [x] CI/CD status panel
- [x] Activity chart
- [x] Multi-model AI provider support
- [ ] GitHub OAuth integration
- [ ] Real-time data fetching from GitHub API
- [ ] AI chat with natural language queries
- [ ] Team management & multi-user support
- [ ] GitLab integration
- [ ] Slack / Discord notifications
- [ ] Weekly/monthly report generation
- [ ] Plugin system for custom data sources

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Vercel AI SDK (multi-provider)
- **Auth**: NextAuth.js
- **Database**: SQLite (default) / PostgreSQL
- **Deployment**: Docker / Vercel / Self-hosted

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the WizDev community
</p>
