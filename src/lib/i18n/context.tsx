"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LANGUAGE_OPTIONS, translations } from "./translations";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

const STORAGE_KEY = "wizdev_language";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as Language;
    if (saved && ["en", "zh-CN", "zh-TW", "ja"].includes(saved)) {
      setLanguageState(saved);
    } else {
      // Auto detect from browser
      const navLang = navigator.language;
      if (navLang.startsWith("zh-TW") || navLang.startsWith("zh-HK")) {
        setLanguageState("zh-TW");
      } else if (navLang.startsWith("zh")) {
        setLanguageState("zh-CN");
      } else if (navLang.startsWith("ja")) {
        setLanguageState("ja");
      } else {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const t = (key: string): string => {
    if (!mounted) {
      // Fallback during SSR to prevent hydration mismatch
      return translations.en[key] || key;
    }
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  return useContext(I18nContext);
}
