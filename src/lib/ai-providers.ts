/**
 * WizDev AI Provider Abstraction
 * Supports: OpenAI, DeepSeek, Gemini, Claude, Ollama (local)
 */

export type AIProvider = "openai" | "deepseek" | "gemini" | "claude" | "ollama";

export interface AIProviderConfig {
  id: AIProvider;
  name: string;
  icon: string;
  description: string;
  baseUrl?: string;
  models: string[];
  defaultModel: string;
  requiresApiKey: boolean;
}

export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  openai: {
    id: "openai",
    name: "OpenAI",
    icon: "🟢",
    description: "GPT-4o, GPT-4o-mini",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
    defaultModel: "gpt-4o-mini",
    requiresApiKey: true,
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek",
    icon: "🔵",
    description: "DeepSeek V3, DeepSeek Coder",
    baseUrl: "https://api.deepseek.com",
    models: ["deepseek-chat", "deepseek-coder", "deepseek-reasoner"],
    defaultModel: "deepseek-chat",
    requiresApiKey: true,
  },
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    icon: "🔷",
    description: "Gemini 2.5 Pro, Gemini 2.5 Flash",
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
    defaultModel: "gemini-2.5-flash",
    requiresApiKey: true,
  },
  claude: {
    id: "claude",
    name: "Anthropic Claude",
    icon: "🟠",
    description: "Claude Opus 4, Claude Sonnet 4",
    models: ["claude-opus-4", "claude-sonnet-4", "claude-haiku-3.5"],
    defaultModel: "claude-sonnet-4",
    requiresApiKey: true,
  },
  ollama: {
    id: "ollama",
    name: "Ollama (Local)",
    icon: "🏠",
    description: "Run models locally — Llama, Qwen, Mistral",
    baseUrl: "http://localhost:11434",
    models: ["llama3.1:8b", "qwen2.5:7b", "mistral:7b", "codellama:13b"],
    defaultModel: "llama3.1:8b",
    requiresApiKey: false,
  },
};

export function getProviderConfig(provider: AIProvider): AIProviderConfig {
  return AI_PROVIDERS[provider];
}

export function getAllProviders(): AIProviderConfig[] {
  return Object.values(AI_PROVIDERS);
}
