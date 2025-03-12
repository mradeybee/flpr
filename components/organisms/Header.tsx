"use client"

import Link from "next/link"
import { Button } from "@/components/atoms/Button"
import { useTranslations } from "@/hooks/use-translations"
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const t = useTranslations()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-flipr-orange">{t.appName}</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {user ? (
            // Authenticated navigation
            <>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.dashboard}
              </Link>
              {(user.userType === "investor" || user.userType === "homeowner") && (
                <Link href="/properties" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.properties}
                </Link>
              )}
              {user.userType === "investor" && (
                <Link href="/lenders" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.lenders}
                </Link>
              )}
              {user.userType === "investor" && (
                <Link href="/contractors" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.contractors}
                </Link>
              )}
            </>
          ) : (
            // Public navigation - now empty
            <></>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {user ? (
            // Authenticated actions
            <Button
              variant="outline"
              className="border-flipr-orange text-flipr-orange hover:bg-flipr-orange/10"
              onClick={() => logout()}
            >
              {t.logout || "Logout"}
            </Button>
          ) : (
            // Public actions
            <>
              <Link href="/login">
                <Button variant="outline" className="border-flipr-orange text-flipr-orange hover:bg-flipr-orange/10">
                  {t.login}
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-flipr-orange hover:bg-flipr-orange/90">{t.signup}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

