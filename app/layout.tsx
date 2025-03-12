import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { CookieConsent } from "@/components/cookie-consent"
import ProtectedRoute from "@/components/protected-route"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata title
export const metadata: Metadata = {
  title: "Flpr - Find, Fund, and Flip Properties with Ease",
  description: "Flpr connects homeowners, real estate investors, lenders, and contractors in one seamless platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
            <CookieConsent />
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'