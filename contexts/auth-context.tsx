"use client"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define user types
export type UserType = "homeowner" | "investor" | "contractor" | "lender"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: UserType
}

// Dummy users for testing
export const dummyUsers = [
  {
    id: "1",
    email: "homeowner@email.com",
    password: "homeowner",
    firstName: "Home",
    lastName: "Owner",
    userType: "homeowner" as UserType,
  },
  {
    id: "2",
    email: "investor@email.com",
    password: "investor",
    firstName: "In",
    lastName: "Vestor",
    userType: "investor" as UserType,
  },
  {
    id: "3",
    email: "contractor@email.com",
    password: "contractor",
    firstName: "Con",
    lastName: "Tractor",
    userType: "contractor" as UserType,
  },
  {
    id: "4",
    email: "lender@email.com",
    password: "lender",
    firstName: "Len",
    lastName: "Der",
    userType: "lender" as UserType,
  },
]

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing user in session storage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("flpr_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user with matching email and password
    const foundUser = dummyUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)

      // Store in session storage
      sessionStorage.setItem("flpr_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("flpr_user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

