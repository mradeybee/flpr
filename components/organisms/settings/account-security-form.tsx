"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle } from "lucide-react"

export function AccountSecurityForm() {
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would update the password
    // await updatePassword(passwordData)

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setIsLoading(false)
  }

  const handleTwoFactorToggle = async () => {
    setTwoFactorEnabled(!twoFactorEnabled)

    // Here you would enable/disable 2FA
    // await updateTwoFactorAuth(!twoFactorEnabled)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.accountSecurity || "Account & Security"}</h3>
        <p className="text-sm text-muted-foreground">
          {t.manageYourAccountSecurity || "Manage your account security settings and preferences."}
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-2">{t.changePassword || "Change Password"}</h4>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t.currentPassword || "Current Password"}</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">{t.newPassword || "New Password"}</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword || "Confirm Password"}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-flipr-orange hover:bg-flipr-orange/90">
                {isLoading ? t.updating || "Updating..." : t.updatePassword || "Update Password"}
              </Button>
            </div>
          </form>
        </div>

        <Separator />

        <div>
          <h4 className="text-md font-medium mb-2">{t.twoFactorAuth || "Two-Factor Authentication"}</h4>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">{t.twoFactorAuth || "Two-Factor Authentication"}</div>
              <div className="text-sm text-muted-foreground">
                {t.twoFactorDescription || "Add an extra layer of security to your account."}
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
              aria-label={t.twoFactorAuth || "Two-Factor Authentication"}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-md font-medium mb-2">{t.sessions || "Active Sessions"}</h4>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>{t.currentSession || "Current Session"}</AlertTitle>
            <AlertDescription>{t.currentSessionDesc || "You are currently logged in on this device."}</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button variant="outline" className="text-destructive">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {t.logoutAllDevices || "Logout from all devices"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

