"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/atoms/Button"
import { useTranslations } from "@/hooks/use-translations"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = Cookies.get("cookie-consent")
    if (!cookieConsent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    Cookies.set("cookie-consent", "accepted", { expires: 365, path: "/" })
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t p-4 shadow-lg">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <p>{t.cookieConsentText}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={acceptCookies}>
            {t.cookieConsentDecline}
          </Button>
          <Button onClick={acceptCookies}>{t.cookieConsentAccept}</Button>
        </div>
      </div>
    </div>
  )
}

