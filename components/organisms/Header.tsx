"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, CreditCard, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const t = useTranslations()
  const { user, logout } = useAuth()

  // Create a full name from firstName and lastName
  const fullName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.lastName || t.user || "User"
    : ""

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mr-8">
            <span className="text-flipr-orange">{t.appName}</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {user ? (
              // Authenticated navigation
              <>
                {user.userType === "investor" && (
                  <>
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.dashboard}
                    </Link>
                    <Link href="/properties" className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.properties}
                    </Link>
                    <Link href="/lenders" className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.lenders}
                    </Link>
                    <Link href="/contractors" className="text-muted-foreground hover:text-foreground transition-colors">
                      {t.contractors}
                    </Link>
                  </>
                )}
              </>
            ) : (
              // Public navigation - now empty
              <></>
            )}
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <LanguageSwitcher />
          {user ? (
            // Authenticated actions - now with dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 rounded-full flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={fullName} />
                    <AvatarFallback className="bg-flipr-orange text-white">
                      {fullName ? fullName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate text-sm font-medium hidden sm:block">{fullName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex w-full cursor-pointer items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t.settings}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pricing" className="flex w-full cursor-pointer items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>{t.upgrade || "Upgrade"}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive hover:bg-destructive hover:text-white focus:bg-destructive focus:text-white"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

