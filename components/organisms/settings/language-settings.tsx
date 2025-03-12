"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/contexts/language-context"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSettings() {
  const t = useTranslations()
  const { language, setLanguage } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update language
    setLanguage(selectedLanguage)

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.language}</h3>
        <p className="text-sm text-muted-foreground">
          {t.languagePreferences || "Choose your preferred language for the platform."}
        </p>
      </div>

      <Separator />

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Globe className="mr-2 h-5 w-5 text-flipr-orange" />
            <h4 className="text-md font-medium">{t.selectLanguage || "Select Language"}</h4>
          </div>

          <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en" id="en" />
              <Label htmlFor="en" className="flex items-center">
                <span className="mr-2">🇺🇸</span> {t.english}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="es" id="es" />
              <Label htmlFor="es" className="flex items-center">
                <span className="mr-2">🇪🇸</span> {t.spanish}
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading || selectedLanguage === language}
              className="bg-flipr-orange hover:bg-flipr-orange/90"
            >
              {isLoading ? t.saving || "Saving..." : t.saveChanges || "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

