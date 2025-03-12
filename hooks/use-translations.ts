"use client"

import { useLanguage } from "@/contexts/language-context"
import { en } from "@/translations/en"
import { es } from "@/translations/es"

export function useTranslations() {
  const { language } = useLanguage()

  // Return the appropriate translation object based on the selected language
  return language === "en" ? en : es
}

