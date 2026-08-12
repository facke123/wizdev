"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import {
  User, Bot, Github, Bell, Palette,
  Key, Eye, EyeOff, Check, ChevronRight, Sun, Monitor,
  Zap, Globe, Shield
} from "lucide-react";
import { getAllProviders, type AIProvider } from "@/lib/ai-providers";

const NAV_ITEMS = [
  { key: "general",     label: "General",       icon: User,    desc: "Profile & preferences" },
  { key: "ai",          label: "AI Providers",  icon: Bot,     desc: "API keys & models" },
  { key: "github",      label: "GitHub",        icon: Github,  desc: "Repository connections" },
  { key: "notifications", label: "Notifications", icon: Bell,  desc: "Alerts & digests" },
  { key: "appearance",  label: "Appearance",    icon: Palette, desc: "Theme & display" },
];

const PROVIDERS = getAllProviders();

function SettingSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="card p-5 sm:p-6 mb-5">
      <div className="mb-5">
        <h3 className="text-[14px] font-bold text-[var(--text-primary)]">{title}</h3>
        {description && <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[var(--text-primary)]">{label}</p>
        {description && <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className="w-10 h-5.5 rounded-full transition-all relative shrink-0"
      style={{
        background: enabled ? "linear-gradient(135deg, #7c6dfa, #5b4fdf)" : "rgba(255,255,255,0.10)",
        boxShadow: enabled ? "0 0 8px rgba(124,109,250,0.4)" : "none",
      }}
    >
      <div className="absolute top-0.5 rounded-full w-4 h-4 bg-white transition-all duration-200"
        style={{ left: enabled ? "calc(100% - 18px)" : "2px" }} />
    </button>
  );
}

function TextInput({ placeholder, type = "text", value, onChange }: { placeholder: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 rounded-xl text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none transition-all"
      style={{ background: "rgba(7,11,20,0.7)", border: "1px solid rgba(255,255,255,0.10)" }}
      onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(124,109,250,0.45)"; (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,109,250,0.08)"; }}
      onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
    />
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [showKeys, setShowKeys]           = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys]             = useState<Record<string, string>>({});
  const [enabledProviders, setEnabled]    = useState<Record<string, boolean>>({ openai: true, ollama: true });
  const [savedFeedback, setSavedFeedback] = useState(false);

  // General state
  const [displayName, setDisplayName] = useState("John Doe");
  const [email, setEmail]             = useState("john@example.com");
  const [timezone, setTimezone]       = useState("Asia/Shanghai");

  // Notification state
  const [notifPR,  setNotifPR]  = useState(true);
  const [notifCI,  setNotifCI]  = useState(true);
  const [notifAI,  setNotifAI]  = useState(false);
  const [digest,   setDigest]   = useState(true);

  // Appearance
  const [theme,   setTheme]   = useState("dark");
  const [density, setDensity] = useState("comfortable");

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--text-tertiary)] mt-1">Manage your account, AI providers and preferences</p>
      </div>

      <div className="flex gap-6 items-start">
        {/* ── Left Nav ──────────────────────────────── */}
        <div className="w-56 shrink-0 card p-2 sticky top-24">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.key} onClick={() => setActiveSection(item.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all mb-0.5"
                style={activeSection === item.key
                  ? { background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.25)" }
                  : { background: "transparent", border: "1px solid transparent" }}
                onMouseEnter={e => { if (activeSection !== item.key) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={e => { if (activeSection !== item.key) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <Icon className="w-4 h-4 shrink-0"
                  style={{ color: activeSection === item.key ? "#9d91fc" : "var(--text-tertiary)" }}
                  strokeWidth={1.75} />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[var(--text-primary)] truncate">{item.label}</p>
                </div>
                <ChevronRight className="w-3 h-3 ml-auto shrink-0 text-[var(--text-disabled)]" />
              </button>
            );
          })}
        </div>

        {/* ── Right Content ──────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* ── General ── */}
          {activeSection === "general" && (
            <>
              <SettingSection title="Profile" description="Your public display information">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c6dfa, #5b4fdf)", boxShadow: "0 4px 16px rgba(124,109,250,0.35)" }}>
                    JD
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "var(--text-secondary)" }}>
                    Change avatar
                  </button>
                </div>
                <SettingRow label="Display Name">
                  <div className="w-64"><TextInput placeholder="Your name" value={displayName} onChange={setDisplayName} /></div>
                </SettingRow>
                <SettingRow label="Email">
                  <div className="w-64"><TextInput placeholder="email@example.com" type="email" value={email} onChange={setEmail} /></div>
                </SettingRow>
                <SettingRow label="Timezone">
                  <select value={timezone} onChange={e => setTimezone(e.target.value)}
                    className="w-64 px-3 py-2 rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none"
                    style={{ background: "rgba(7,11,20,0.7)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    <option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</option>
                    <option value="America/New_York">America/New_York (UTC-5)</option>
                    <option value="Europe/London">Europe/London (UTC+0)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
                  </select>
                </SettingRow>
              </SettingSection>

              <SettingSection title="Security" description="Account security settings">
                <SettingRow label="Two-factor Authentication" description="Protect your account with 2FA">
                  <Toggle enabled={false} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Session Timeout" description="Auto-logout after inactivity">
                  <select className="px-3 py-2 rounded-xl text-[12px] text-[var(--text-secondary)] focus:outline-none"
                    style={{ background: "rgba(7,11,20,0.7)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>Never</option>
                  </select>
                </SettingRow>
              </SettingSection>
            </>
          )}

          {/* ── AI Providers ── */}
          {activeSection === "ai" && (
            <SettingSection title="AI Provider API Keys" description="Configure your AI providers. Keys are stored locally and never sent to our servers.">
              <div className="space-y-4">
                {PROVIDERS.map(p => {
                  const isEnabled = !!enabledProviders[p.id];
                  const showKey   = !!showKeys[p.id];
                  const key       = apiKeys[p.id] || "";
                  return (
                    <div key={p.id} className="p-4 rounded-xl transition-all"
                      style={{
                        background: isEnabled ? "rgba(124,109,250,0.05)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${isEnabled ? "rgba(124,109,250,0.20)" : "rgba(255,255,255,0.06)"}`,
                      }}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{p.icon}</span>
                          <div>
                            <p className="text-[13px] font-bold text-[var(--text-primary)]">{p.name}</p>
                            <p className="text-[11px] text-[var(--text-tertiary)]">{p.description}</p>
                          </div>
                        </div>
                        <Toggle enabled={isEnabled}
                          onChange={() => setEnabled(prev => ({ ...prev, [p.id]: !prev[p.id] }))} />
                      </div>
                      {isEnabled && p.requiresApiKey && (
                        <div className="relative flex items-center gap-2">
                          <div className="flex-1 relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                            <input
                              type={showKey ? "text" : "password"}
                              value={key}
                              onChange={e => setApiKeys(prev => ({ ...prev, [p.id]: e.target.value }))}
                              placeholder={`Enter ${p.name} API key`}
                              className="w-full pl-9 pr-4 py-2 rounded-xl text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none transition-all"
                              style={{ background: "rgba(7,11,20,0.7)", border: "1px solid rgba(255,255,255,0.10)" }}
                            />
                          </div>
                          <button onClick={() => setShowKeys(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                            className="p-2 rounded-lg transition-all" style={{ color: "var(--text-tertiary)" }}>
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      )}
                      {isEnabled && !p.requiresApiKey && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10d98e" }} />
                          <p className="text-[11px] text-[#10d98e]">No API key required — runs locally on {p.baseUrl}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SettingSection>
          )}

          {/* ── GitHub ── */}
          {activeSection === "github" && (
            <>
              <SettingSection title="GitHub Connection" description="Connect your GitHub account to enable repository data">
                <div className="p-4 rounded-xl flex items-center justify-between gap-4"
                  style={{ background: "rgba(16,217,142,0.08)", border: "1px solid rgba(16,217,142,0.20)" }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl" style={{ background: "rgba(16,217,142,0.15)" }}>
                      <Github className="w-5 h-5" style={{ color: "#10d98e" }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[var(--text-primary)]">facke123</p>
                      <p className="text-[11px] text-[#10d98e]">Connected · GitHub OAuth</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                    style={{ background: "rgba(251,113,133,0.12)", border: "1px solid rgba(251,113,133,0.22)", color: "#fca5a5" }}>
                    Disconnect
                  </button>
                </div>
                <SettingRow label="Auto-sync interval" description="How often to pull fresh data from GitHub">
                  <select className="px-3 py-2 rounded-xl text-[12px] text-[var(--text-secondary)] focus:outline-none"
                    style={{ background: "rgba(7,11,20,0.7)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Manual only</option>
                  </select>
                </SettingRow>
              </SettingSection>
              <SettingSection title="Repository Access" description="Choose which repositories to include in your dashboard">
                {["wizdev-app", "wizdev-api", "wizdev-docs"].map(repo => (
                  <SettingRow key={repo} label={repo} description="github.com/facke123">
                    <Toggle enabled={true} onChange={() => {}} />
                  </SettingRow>
                ))}
              </SettingSection>
            </>
          )}

          {/* ── Notifications ── */}
          {activeSection === "notifications" && (
            <SettingSection title="Notification Preferences" description="Control when and how you get notified">
              <SettingRow label="PR Review Requests" description="When someone requests your review">
                <Toggle enabled={notifPR} onChange={() => setNotifPR(!notifPR)} />
              </SettingRow>
              <SettingRow label="CI/CD Failures" description="When a workflow fails on monitored branches">
                <Toggle enabled={notifCI} onChange={() => setNotifCI(!notifCI)} />
              </SettingRow>
              <SettingRow label="AI Briefing Ready" description="When your daily AI summary is generated">
                <Toggle enabled={notifAI} onChange={() => setNotifAI(!notifAI)} />
              </SettingRow>
              <div className="border-t pt-4 mt-2" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <SettingRow label="Daily Digest Email" description="Receive a morning summary of your dev activity">
                  <Toggle enabled={digest} onChange={() => setDigest(!digest)} />
                </SettingRow>
              </div>
            </SettingSection>
          )}

          {/* ── Appearance ── */}
          {activeSection === "appearance" && (
            <SettingSection title="Appearance" description="Customize the look and feel of WizDev">
              <SettingRow label="Theme">
                <div className="flex gap-2">
                  {[
                    { value: "dark",   label: "Dark",   icon: Monitor },
                    { value: "light",  label: "Light",  icon: Sun },
                    { value: "system", label: "System", icon: Globe },
                  ].map(t => {
                    const Icon = t.icon;
                    return (
                      <button key={t.value} onClick={() => setTheme(t.value)}
                        className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-semibold transition-all"
                        style={theme === t.value
                          ? { background: "rgba(124,109,250,0.18)", border: "1px solid rgba(124,109,250,0.30)", color: "#c4bcff" }
                          : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-tertiary)" }}>
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </SettingRow>
              <SettingRow label="Density" description="Controls spacing and element sizes">
                <div className="flex gap-2">
                  {["compact", "comfortable", "spacious"].map(d => (
                    <button key={d} onClick={() => setDensity(d)}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-semibold capitalize transition-all"
                      style={density === d
                        ? { background: "rgba(124,109,250,0.18)", border: "1px solid rgba(124,109,250,0.30)", color: "#c4bcff" }
                        : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-tertiary)" }}>
                      {d}
                    </button>
                  ))}
                </div>
              </SettingRow>
              <SettingRow label="Sidebar collapsed by default">
                <Toggle enabled={false} onChange={() => {}} />
              </SettingRow>
              <SettingRow label="Reduced motion" description="Minimize animations for accessibility">
                <Toggle enabled={false} onChange={() => {}} />
              </SettingRow>
            </SettingSection>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-2">
            <button onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all"
              style={{
                background: savedFeedback ? "linear-gradient(135deg, #10d98e, #059669)" : "linear-gradient(135deg, #7c6dfa, #5b4fdf)",
                boxShadow: "0 2px 8px rgba(124,109,250,0.4)",
              }}>
              {savedFeedback ? <><Check className="w-4 h-4" />Saved!</> : <><Zap className="w-4 h-4" />Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
