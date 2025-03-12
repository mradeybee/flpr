"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { UserType } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserTypes?: UserType[]
}

export default function ProtectedRoute({ children, allowedUserTypes }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip during initial loading
    if (isLoading) return

    // Public routes that don't need authentication
    const publicRoutes = ["/", "/login", "/signup", "/pricing", "/privacy", "/terms", "/contact"]
    if (publicRoutes.includes(pathname)) return

    // If no user is logged in, redirect to login
    if (!user) {
      router.push("/login")
      return
    }

    // If specific user types are allowed and user doesn't match, redirect to dashboard
    if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
      router.push("/dashboard")
      return
    }
  }, [user, isLoading, router, pathname, allowedUserTypes])

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  // Public routes or authenticated user with correct type
  return <>{children}</>
}

