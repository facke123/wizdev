import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "WizDev — AI-Powered Developer Dashboard",
  description:
    "Your AI copilot dashboard for development workflows. AI-generated daily briefs, smart PR triage, team velocity insights, and more. Self-hosted and open source.",
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
      "AI-generated daily briefs. Smart PR triage. Team velocity insights. Self-hosted.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
