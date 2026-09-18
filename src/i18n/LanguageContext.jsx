import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LANG_KEY = "gp_portfolio_lang";
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(LANG_KEY) === "es" ? "es" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore — language just won't remember across visits
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "en" ? "es" : "en"));
  }, []);

  return <LanguageContext.Provider value={{ lang, dict: translations[lang], toggleLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// Picks the current-language variant of a { en: {...}, es: {...} } content
// entry (fragments/obstacles), falling back to English.
export function pickLang(entry, lang) {
  return entry[lang] || entry.en;
}
