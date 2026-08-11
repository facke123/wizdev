import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WizDev — AI-Powered Developer Dashboard",
  description:
    "Your AI copilot dashboard for development workflows. Get AI-generated daily briefs, smart PR triage, team velocity insights, and more. Self-hosted & open source.",
  keywords: [
    "developer dashboard",
    "AI",
    "GitHub",
    "productivity",
    "open source",
    "self-hosted",
  ],
  openGraph: {
    title: "WizDev — AI-Powered Developer Dashboard",
    description:
      "AI-generated daily briefs · Smart PR triage · Team velocity insights · Self-hosted",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {/* Background gradient orbs */}
        <div className="bg-gradient-orb purple" />
        <div className="bg-gradient-orb cyan" />
        {children}
      </body>
    </html>
  );
}
