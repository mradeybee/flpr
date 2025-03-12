"use client"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import Cookies from "js-cookie"

type Language = "en" | "es"

interface LanguageContextProps {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with default language
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Load saved language preference from cookie on mount
  useEffect(() => {
    setMounted(true)
    const savedLanguage = Cookies.get("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
      // Update html lang attribute for accessibility
      if (typeof document !== "undefined") {
        document.documentElement.lang = savedLanguage
      }
    } else {
      // Try to detect browser language
      if (typeof navigator !== "undefined") {
        const browserLanguage = navigator.language.split("-")[0]
        if (browserLanguage === "es") {
          setLanguage("es")
          // Set cookie with detected language
          Cookies.set("language", "es", { expires: 365, path: "/" })
          // Update html lang attribute for accessibility
          if (typeof document !== "undefined") {
            document.documentElement.lang = "es"
          }
        }
      }
    }
  }, [])

  // Save language preference to cookie when it changes
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    Cookies.set("language", newLanguage, { expires: 365, path: "/" })
    // Update html lang attribute for accessibility
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLanguage
    }
  }

  // Only render children when mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

