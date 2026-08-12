import { NextResponse } from "next/server";
import { AI_PROVIDERS, type AIProvider } from "@/lib/ai-providers";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { provider = "openai", apiKey, customBaseUrl, messages = [], model } = body;

    const providerConfig = AI_PROVIDERS[provider as AIProvider];
    if (!providerConfig) {
      return NextResponse.json({ error: `Unknown AI provider: "${provider}"` }, { status: 400 });
    }

    const selectedModel = model || providerConfig.defaultModel;

    // Check for API key (either passed from client settings or server env)
    const effectiveKey =
      apiKey ||
      process.env[`${provider.toUpperCase()}_API_KEY`] ||
      process.env.OPENAI_API_KEY;

    if (providerConfig.requiresApiKey && !effectiveKey) {
      return NextResponse.json(
        {
          error: `API key for ${providerConfig.name} is missing. Please enter your API Key in Settings → AI Providers and click "Save Changes".`,
        },
        { status: 401 }
      );
    }

    // Helper for 20s timeout with detailed network error capture
    const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs = 20000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(url, { ...init, signal: controller.signal });
        clearTimeout(id);
        return response;
      } catch (err: unknown) {
        clearTimeout(id);
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            throw new Error(`Connection to ${url} timed out after ${timeoutMs / 1000}s. Check network connection or proxy.`);
          }
          if (err.message.includes("fetch failed") || err.message.includes("ECONNREFUSED") || err.message.includes("ETIMEDOUT")) {
            throw new Error(
              `Network error (fetch failed) connecting to ${url}.\n\n` +
              `💡 Hint: If you are in mainland China, direct access to OpenAI/Claude/Gemini servers is blocked by GFW.\n` +
              `• Recommended: Switch provider to **DeepSeek** (domestic API) or **Ollama** (local AI).\n` +
              `• Or configure a Custom Base URL / Proxy URL in Settings → AI Providers.`
            );
          }
        }
        throw err;
      }
    };

    // ── 1. OpenAI & DeepSeek ──────────────────────────────────────────────
    if (provider === "openai" || provider === "deepseek") {
      let defaultUrl = provider === "deepseek" ? "https://api.deepseek.com/v1" : "https://api.openai.com/v1";
      const envUrl = provider === "openai" ? process.env.OPENAI_BASE_URL : process.env.DEEPSEEK_BASE_URL;
      const rawBase = customBaseUrl || envUrl || defaultUrl;
      const baseUrl = rawBase.replace(/\/+$/, "");
      const endpoint = baseUrl.endsWith("/chat/completions") ? baseUrl : `${baseUrl}/chat/completions`;

      const res = await fetchWithTimeout(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${effectiveKey}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = {}; }

      if (!res.ok) {
        let msg = data.error?.message || data.message || text || `HTTP ${res.status}`;
        if (res.status === 403 || msg.includes("not available in your region")) {
          msg = `${msg}\n\n` +
            `🌏 **原因说明**：这是 OpenAI 官方针对国内/香港地区 IP 的地域封锁限制（Region Block）。\n` +
            `💡 **推荐解决方案**：\n` +
            `1. **无缝替代**：在顶部/设置中切换为 **DeepSeek**，国内完全通畅且效果媲美 GPT-4！\n` +
            `2. **使用解封代理**：换用支持解封地区限制的中转服务商 Base URL（如 ChatAnywhere 或具有美/日出口节点的 Proxy）。\n` +
            `3. **本地部署**：使用 **Ollama** 运行本地 Llama / Qwen 大模型。`;
        }
        return NextResponse.json(
          { error: `${providerConfig.name} API Error (${res.status}): ${msg}` },
          { status: res.status }
        );
      }

      const content = data.choices?.[0]?.message?.content || "No response content received.";
      return NextResponse.json({ content, model: selectedModel, provider });
    }

    // ── 2. Google Gemini ──────────────────────────────────────────────────
    if (provider === "gemini") {
      const geminiModel = selectedModel.startsWith("gemini") ? selectedModel : "gemini-2.5-flash";
      const rawBase = customBaseUrl || process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com";
      const baseUrl = rawBase.replace(/\/+$/, "");
      const url = `${baseUrl}/v1beta/models/${geminiModel}:generateContent?key=${effectiveKey}`;

      const contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const res = await fetchWithTimeout(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });

      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = {}; }

      if (!res.ok) {
        const msg = data.error?.message || text || `HTTP ${res.status}`;
        return NextResponse.json(
          { error: `Gemini API Error (${res.status}): ${msg}` },
          { status: res.status }
        );
      }

      const content =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response content received from Gemini.";
      return NextResponse.json({ content, model: selectedModel, provider });
    }

    // ── 3. Anthropic Claude ───────────────────────────────────────────────
    if (provider === "claude") {
      const claudeModel = selectedModel.includes("claude") ? selectedModel : "claude-3-5-sonnet-20241022";
      const rawBase = customBaseUrl || process.env.CLAUDE_BASE_URL || "https://api.anthropic.com";
      const baseUrl = rawBase.replace(/\/+$/, "");
      const endpoint = baseUrl.endsWith("/v1/messages") ? baseUrl : `${baseUrl}/v1/messages`;

      const res = await fetchWithTimeout(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": effectiveKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: claudeModel,
          max_tokens: 1024,
          messages: messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = {}; }

      if (!res.ok) {
        const msg = data.error?.message || text || `HTTP ${res.status}`;
        return NextResponse.json(
          { error: `Claude API Error (${res.status}): ${msg}` },
          { status: res.status }
        );
      }

      const content = data.content?.[0]?.text || "No response content received from Claude.";
      return NextResponse.json({ content, model: selectedModel, provider });
    }

    // ── 4. Ollama (Local) ─────────────────────────────────────────────────
    if (provider === "ollama") {
      const rawBase = customBaseUrl || providerConfig.baseUrl || "http://localhost:11434";
      const baseUrl = rawBase.replace(/\/+$/, "");
      const endpoint = baseUrl.endsWith("/api/chat") ? baseUrl : `${baseUrl}/api/chat`;

      const res = await fetchWithTimeout(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          messages: messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
          stream: false,
        }),
      }).catch((e) => {
        throw new Error(`Cannot connect to local Ollama at ${baseUrl}. Make sure Ollama is running locally. (${e.message})`);
      });

      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = {}; }

      if (!res.ok) {
        const msg = data.error || text || `HTTP ${res.status}`;
        return NextResponse.json(
          { error: `Ollama Error (${res.status}): ${msg}` },
          { status: res.status }
        );
      }

      const content = data.message?.content || "No response content received from local Ollama.";
      return NextResponse.json({ content, model: selectedModel, provider });
    }

    return NextResponse.json({ error: "Unsupported AI provider" }, { status: 400 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[/api/chat] Server Error:", errorMsg);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
