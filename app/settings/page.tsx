"use client"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { DashboardLayout } from "@/components/templates/DashboardLayout"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { PersonalInfoForm } from "@/components/organisms/settings/personal-info-form"
import { AccountSecurityForm } from "@/components/organisms/settings/account-security-form"
import { NotificationSettings } from "@/components/organisms/settings/notification-settings"
import { LanguageSettings } from "@/components/organisms/settings/language-settings"
import { BillingSettings } from "@/components/organisms/settings/billing-settings"

export default function SettingsPage() {
    const t = useTranslations()
    const [activeTab, setActiveTab] = useState("personal")

    return (
        <DashboardLayout>

            <div className="container py-8">
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t.settings}</h1>
                        <p className="text-muted-foreground mt-2">
                            {t.manageYourAccountSettings || "Manage your account settings and preferences."}
                        </p>
                    </div>

                    <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="bg-muted/50 p-1">
                            <TabsTrigger value="personal" className="flex-1 sm:flex-none">
                                {t.personalInfo || "Personal Info"}
                            </TabsTrigger>
                            <TabsTrigger value="account" className="flex-1 sm:flex-none">
                                {t.accountSecurity || "Account & Security"}
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="flex-1 sm:flex-none">
                                {t.notifications}
                            </TabsTrigger>
                            <TabsTrigger value="language" className="flex-1 sm:flex-none">
                                {t.language}
                            </TabsTrigger>
                            <TabsTrigger value="billing" className="flex-1 sm:flex-none">
                                {t.billing || "Billing"}
                            </TabsTrigger>
                        </TabsList>

                        <Card className="p-6">
                            <TabsContent value="personal" className="mt-0">
                                <PersonalInfoForm />
                            </TabsContent>

                            <TabsContent value="account" className="mt-0">
                                <AccountSecurityForm />
                            </TabsContent>

                            <TabsContent value="notifications" className="mt-0">
                                <NotificationSettings />
                            </TabsContent>

                            <TabsContent value="language" className="mt-0">
                                <LanguageSettings />
                            </TabsContent>

                            <TabsContent value="billing" className="mt-0">
                                <BillingSettings />
                            </TabsContent>
                        </Card>
                    </Tabs>
                </div>
            </div>
        </DashboardLayout>

    )
}
