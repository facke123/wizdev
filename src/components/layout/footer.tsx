import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Dashboard", href: "/" },
    { label: "Pull Requests", href: "/prs" },
    { label: "CI/CD", href: "/ci" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api" },
    { label: "Changelog", href: "/changelog" },
  ],
  Company: [
    { label: "GitHub", href: "https://github.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Privacy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--surface-base)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tighter">
                  W
                </span>
              </div>
              <span className="font-bold text-sm text-[var(--text-primary)] tracking-tight">
                WizDev
              </span>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed max-w-[28ch]">
              AI-powered developer dashboard. Open source, self-hosted, built
              for modern engineering teams.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-disabled)]">
            &copy; {new Date().getFullYear()} WizDev. Open source under MIT
            License.
          </p>
          <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
            <span className="inline-flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-success)]" />
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
