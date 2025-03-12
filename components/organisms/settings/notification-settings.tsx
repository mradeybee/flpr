"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Mail, MessageSquare, DollarSign, Home } from "lucide-react"

export function NotificationSettings() {
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: {
      propertyUpdates: true,
      newMessages: true,
      marketingEmails: false,
      accountAlerts: true,
      paymentNotifications: true,
    },
    push: {
      propertyUpdates: true,
      newMessages: true,
      marketingAlerts: false,
      accountAlerts: false,
      paymentNotifications: true,
    },
  })

  const handleToggle = (channel: "email" | "push", setting: string) => {
    setNotifications({
      ...notifications,
      [channel]: {
        ...notifications[channel],
        [setting]: !notifications[channel][setting as keyof (typeof notifications)[typeof channel]],
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would update notification settings
    // await updateNotificationSettings(notifications)

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.notifications}</h3>
        <p className="text-sm text-muted-foreground">
          {t.notificationPreferences || "Configure how you receive notifications."}
        </p>
      </div>

      <Separator />

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium mb-4 flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              {t.emailNotifications || "Email Notifications"}
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <Home className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.propertyUpdates || "Property Updates"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.propertyUpdatesDesc || "Receive updates about properties you're interested in."}
                  </div>
                </div>
                <Switch
                  checked={notifications.email.propertyUpdates}
                  onCheckedChange={() => handleToggle("email", "propertyUpdates")}
                  aria-label={t.propertyUpdates || "Property Updates"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.newMessages || "New Messages"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.newMessagesDesc || "Receive notifications when you get new messages."}
                  </div>
                </div>
                <Switch
                  checked={notifications.email.newMessages}
                  onCheckedChange={() => handleToggle("email", "newMessages")}
                  aria-label={t.newMessages || "New Messages"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.marketingEmails || "Marketing Emails"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.marketingEmailsDesc || "Receive emails about new features and special offers."}
                  </div>
                </div>
                <Switch
                  checked={notifications.email.marketingEmails}
                  onCheckedChange={() => handleToggle("email", "marketingEmails")}
                  aria-label={t.marketingEmails || "Marketing Emails"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.paymentNotifications || "Payment Notifications"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.paymentNotificationsDesc || "Receive notifications about payments and billing."}
                  </div>
                </div>
                <Switch
                  checked={notifications.email.paymentNotifications}
                  onCheckedChange={() => handleToggle("email", "paymentNotifications")}
                  aria-label={t.paymentNotifications || "Payment Notifications"}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-md font-medium mb-4 flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              {t.pushNotifications || "Push Notifications"}
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <Home className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.propertyUpdates || "Property Updates"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.propertyUpdatesDesc || "Receive updates about properties you're interested in."}
                  </div>
                </div>
                <Switch
                  checked={notifications.push.propertyUpdates}
                  onCheckedChange={() => handleToggle("push", "propertyUpdates")}
                  aria-label={t.propertyUpdates || "Property Updates"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.newMessages || "New Messages"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.newMessagesDesc || "Receive notifications when you get new messages."}
                  </div>
                </div>
                <Switch
                  checked={notifications.push.newMessages}
                  onCheckedChange={() => handleToggle("push", "newMessages")}
                  aria-label={t.newMessages || "New Messages"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.marketingAlerts || "Marketing Alerts"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.marketingAlertsDesc || "Receive alerts about new features and special offers."}
                  </div>
                </div>
                <Switch
                  checked={notifications.push.marketingAlerts}
                  onCheckedChange={() => handleToggle("push", "marketingAlerts")}
                  aria-label={t.marketingAlerts || "Marketing Alerts"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-flipr-orange" />
                    {t.paymentNotifications || "Payment Notifications"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.paymentNotificationsDesc || "Receive notifications about payments and billing."}
                  </div>
                </div>
                <Switch
                  checked={notifications.push.paymentNotifications}
                  onCheckedChange={() => handleToggle("push", "paymentNotifications")}
                  aria-label={t.paymentNotifications || "Payment Notifications"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-flipr-orange hover:bg-flipr-orange/90">
            {isLoading ? t.saving || "Saving..." : t.saveChanges || "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}

