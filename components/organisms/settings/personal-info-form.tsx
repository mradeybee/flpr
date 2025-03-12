"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Upload } from "lucide-react"

export function PersonalInfoForm() {
  const t = useTranslations()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company || "",
    jobTitle: user?.jobTitle || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would update the user profile
    // await updateUserProfile(formData)

    setIsLoading(false)
  }

  // Create full name for avatar
  const fullName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.lastName || t.user || "User"
    : ""

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.personalInfo || "Personal Information"}</h3>
        <p className="text-sm text-muted-foreground">
          {t.updateYourPersonalInfo || "Update your personal information and how others see you on the platform."}
        </p>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatarUrl} alt={fullName} />
            <AvatarFallback className="bg-flipr-orange text-white text-xl">
              {fullName ? fullName.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="mt-2">
            <Upload className="mr-2 h-4 w-4" />
            {t.changePhoto || "Change Photo"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t.firstName}</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t.firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t.lastName}</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t.lastName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.phoneNumber || "Phone Number"}</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.phoneNumber || "Phone Number"}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">{t.company || "Company"}</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t.company || "Company"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">{t.jobTitle || "Job Title"}</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder={t.jobTitle || "Job Title"}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-flipr-orange hover:bg-flipr-orange/90">
              {isLoading ? t.saving || "Saving..." : t.saveChanges || "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

