"use client"

import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="w-full border-t py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <p className="text-sm text-muted-foreground">{t.copyright.replace("Flipr", "Flpr")}</p>
        <div className="flex gap-4">
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
            {t.pricing}
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            {t.terms}
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            {t.privacy}
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            {t.contact}
          </Link>
        </div>
      </div>
    </footer>
  )
}

