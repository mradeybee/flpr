"use client"

import type { ReactNode } from "react"
import { DefaultHeader } from "./default-header"
import { DefaultFooter } from "./default-footer"
import { useTranslations } from "@/hooks/use-translations"

interface LayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export default function Layout({ children, header, footer }: LayoutProps) {
  const t = useTranslations()

  return (
    <div className="flex min-h-screen flex-col">
      {header || <DefaultHeader />}

      <main className="flex-1">{children}</main>

      {footer || <DefaultFooter />}
    </div>
  )
}

