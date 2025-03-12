"use client"

import type { ReactNode } from "react"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { useTranslations } from "@/hooks/use-translations"

interface MainLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export function MainLayout({ children, header, footer }: MainLayoutProps) {
  const t = useTranslations()

  return (
    <div className="flex min-h-screen flex-col">
      {header || <Header />}

      <main className="flex-1">{children}</main>

      {footer || <Footer />}
    </div>
  )
}

