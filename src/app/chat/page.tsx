"use client";

import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Send, Bot, User, Sparkles, Plus, Trash2, ChevronDown } from "lucide-react";
import { getAllProviders, type AIProvider } from "@/lib/ai-providers";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  time: string;
  messages: Message[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "1", title: "PR #142 Analysis", preview: "Summarize the key changes...", time: "2h ago",
    messages: [
      { id: "m1", role: "user",      content: "Summarize the key changes in PR #142",       timestamp: new Date() },
      { id: "m2", role: "assistant", content: "PR #142 adds a comprehensive user analytics dashboard featuring:\n\n• **Retention funnel charts** — Multi-step funnel visualization with drop-off percentages\n• **User segmentation** — Cohort analysis grouped by acquisition channel\n• **Real-time activity feed** — WebSocket-powered live event stream\n\nThe PR adds **342 lines** and removes **28 lines**, primarily in `src/components/analytics/` and a new `useRetention` hook.\n\n⚠️ One concern: the funnel component re-renders on every WebSocket message. Consider memoizing with `useMemo`.", timestamp: new Date() },
    ],
  },
  {
    id: "2", title: "Daily Standup Draft", preview: "Generate my standup note...", time: "Yesterday",
    messages: [
      { id: "m3", role: "user",      content: "Generate my standup note for today",          timestamp: new Date() },
      { id: "m4", role: "assistant", content: "Here's your standup note based on recent activity:\n\n**Yesterday:**\n- Reviewed PR #156 (WebSocket memory leak fix) — left 3 review comments\n- Merged PR #167 (dark mode improvements)\n- Triaged 5 new issues from bug tracker\n\n**Today:**\n- Finish review on PR #142 (analytics dashboard)\n- Start OAuth 2.1 migration task (Issue #158)\n- Team sync at 2PM\n\n**Blockers:**\n- Waiting on design mockups for the notification center", timestamp: new Date() },
    ],
  },
];

const QUICK_PROMPTS = [
  "Summarize yesterday's commits across all repos",
  "Which PRs have been open the longest?",
  "Generate my daily standup note",
  "What CI failures need immediate attention?",
  "Draft a release notes summary for v2.3.1",
];

const PROVIDERS = getAllProviders();

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId]           = useState("1");
  const [input, setInput]                 = useState("");
  const [isTyping, setIsTyping]           = useState(false);
  const [provider, setProvider]           = useState<AIProvider>("openai");
  const [showProviders, setShowProviders] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeId)!;
  const currentProvider = PROVIDERS.find(p => p.id === provider)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() };
    const newInput = input;
    setInput("");

    setConversations(prev => prev.map(c =>
      c.id === activeId ? { ...c, messages: [...c.messages, userMsg], preview: newInput } : c
    ));
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've analyzed your request: **"${newInput}"**\n\nThis is a simulated response from ${currentProvider.name} (${currentProvider.defaultModel}). In production, this would connect to the real API endpoint and return actual insights based on your GitHub data.\n\nTo enable real AI responses, add your API key in **Settings → AI Providers**.`,
        timestamp: new Date(),
      };
      setConversations(prev => prev.map(c =>
        c.id === activeId ? { ...c, messages: [...c.messages, reply] } : c
      ));
      setIsTyping(false);
    }, 1800);
  };

  const newConversation = () => {
    const id = Date.now().toString();
    const conv: Conversation = { id, title: "New Chat", preview: "Start a conversation...", time: "now", messages: [] };
    setConversations(prev => [conv, ...prev]);
    setActiveId(id);
  };

  return (
    <AppShell>
      <div className="flex gap-6 h-[calc(100vh-140px)] min-h-[500px]">
        {/* ── Left: Conversation List ─────────────── */}
        <div className="hidden lg:flex flex-col w-64 shrink-0 card p-0 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Conversations</h2>
            <button onClick={newConversation} className="p-1.5 rounded-lg transition-all hover:scale-105"
              style={{ background: "rgba(124,109,250,0.15)", color: "#9d91fc" }}>
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map(conv => (
              <button key={conv.id} onClick={() => setActiveId(conv.id)}
                className="w-full text-left p-3 rounded-xl transition-all"
                style={activeId === conv.id
                  ? { background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.25)" }
                  : { background: "transparent", border: "1px solid transparent" }}
                onMouseEnter={e => { if (activeId !== conv.id) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={e => { if (activeId !== conv.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <p className="text-[12px] font-semibold text-[var(--text-primary)] truncate">{conv.title}</p>
                <p className="text-[10px] text-[var(--text-tertiary)] truncate mt-0.5">{conv.preview}</p>
                <p className="text-[10px] text-[var(--text-disabled)] mt-1">{conv.time}</p>
              </button>
            ))}
          </div>

          {/* New chat button */}
          <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <button onClick={newConversation}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold transition-all"
              style={{ background: "rgba(124,109,250,0.10)", color: "#c4bcff", border: "1px solid rgba(124,109,250,0.22)" }}>
              <Plus className="w-3.5 h-3.5" />
              New conversation
            </button>
          </div>
        </div>

        {/* ── Right: Chat Area ────────────────────── */}
        <div className="flex-1 flex flex-col card p-0 overflow-hidden min-w-0">
          {/* Chat header */}
          <div className="px-5 py-4 border-b flex items-center justify-between gap-3 shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(124,109,250,0.3), rgba(34,211,238,0.2))", border: "1px solid rgba(124,109,250,0.3)" }}>
                🤖
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[var(--text-primary)] truncate">{activeConv.title}</p>
                <p className="text-[10px] text-[var(--text-tertiary)]">{activeConv.messages.length} messages</p>
              </div>
            </div>

            {/* Provider selector */}
            <div className="relative">
              <button onClick={() => setShowProviders(!showProviders)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "rgba(124,109,250,0.10)", border: "1px solid rgba(124,109,250,0.22)", color: "#c4bcff" }}>
                <span>{currentProvider.icon}</span>
                <span className="hidden sm:inline">{currentProvider.name}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showProviders && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50"
                  style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}>
                  {PROVIDERS.map(p => (
                    <button key={p.id} onClick={() => { setProvider(p.id as AIProvider); setShowProviders(false); }}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left transition-all"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <span className="text-base">{p.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-[var(--text-primary)]">{p.name}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)] truncate">{p.description}</p>
                      </div>
                      {provider === p.id && <Sparkles className="w-3 h-3 ml-auto shrink-0 mt-1" style={{ color: "#7c6dfa" }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-1.5 rounded-lg transition-all text-[var(--text-tertiary)] hover:text-[#fb7185]">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeConv.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: "linear-gradient(135deg, rgba(124,109,250,0.2), rgba(34,211,238,0.1))", border: "1px solid rgba(124,109,250,0.25)" }}>
                  🤖
                </div>
                <div className="text-center">
                  <p className="text-[var(--text-primary)] font-semibold">AI Copilot Ready</p>
                  <p className="text-sm text-[var(--text-tertiary)] mt-1">Ask anything about your repositories, PRs, and team metrics</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
                  {QUICK_PROMPTS.map(q => (
                    <button key={q} onClick={() => setInput(q)}
                      className="p-3 rounded-xl text-left text-[12px] text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)]"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {activeConv.messages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5 ${
                      msg.role === "assistant"
                        ? ""
                        : ""
                    }`} style={
                      msg.role === "assistant"
                        ? { background: "linear-gradient(135deg, rgba(124,109,250,0.25), rgba(34,211,238,0.15))", border: "1px solid rgba(124,109,250,0.3)" }
                        : { background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)" }
                    }>
                      {msg.role === "assistant" ? "🤖" : <User className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                      style={
                        msg.role === "user"
                          ? { background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)", color: "white" }
                          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-primary)" }
                      }>
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }}
                      />
                      <p className="text-[10px] mt-2 opacity-50">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(124,109,250,0.25), rgba(34,211,238,0.15))", border: "1px solid rgba(124,109,250,0.3)" }}>
                      🤖
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {[0,1,2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: "#7c6dfa", animationDelay: `${i * 150}ms` }} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t shrink-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {/* Quick prompts */}
            {activeConv.messages.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {QUICK_PROMPTS.slice(0,3).map(q => (
                  <button key={q} onClick={() => setInput(q)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all hover:text-[var(--text-primary)] truncate max-w-[200px]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-tertiary)" }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0 relative">
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={`Message ${currentProvider.name}...`}
                  className="w-full px-4 py-3 rounded-xl text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none transition-all"
                  style={{ background: "rgba(7,11,20,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(124,109,250,0.45)"; (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,109,250,0.10)"; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                />
              </div>
              <button onClick={sendMessage} disabled={!input.trim() || isTyping}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-semibold text-white shrink-0 transition-all disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)", boxShadow: "0 2px 8px rgba(124,109,250,0.4)" }}>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            <p className="text-[10px] text-[var(--text-disabled)] mt-2 text-center">
              <Bot className="w-2.5 h-2.5 inline mr-1" />
              Running on <strong>{currentProvider.defaultModel}</strong> · Add your API key in Settings to enable
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
