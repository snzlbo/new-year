"use client";
import { useTranslation } from "../app/context/TranslationContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === "EN" ? "JP" : "EN")}
      className="bg-white/20 px-4 py-2 rounded-full text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
    >
      🌐 {language}
    </button>
  );
}
