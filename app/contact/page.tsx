"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/templates/MainLayout"
import { useTranslations } from "@/hooks/use-translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContactPage() {
  const t = useTranslations()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check if translations are loaded - only check for language property which is always available
  const isLoading = !t || !t.language

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: t.messageSent,
        description: t.messageReceived,
      })
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-12 max-w-5xl">
          <Skeleton className="h-10 w-64 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-32 w-full" />
                  </div>

                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>

                  <div>
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>

                  <div>
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container py-12 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">{t.contact}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t.getInTouch}</CardTitle>
              <CardDescription>{t.contactDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.yourName}</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.yourEmail}</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t.subject}</Label>
                  <Input id="subject" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.message}</Label>
                  <Textarea id="message" rows={5} required />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t.sending : t.sendMessage}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.contactInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-flipr-orange mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t.email}</h3>
                    <p className="text-muted-foreground">info@flpr.com</p>
                    <p className="text-muted-foreground">support@flpr.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-flipr-orange mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t.phone}</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                    <p className="text-muted-foreground">{t.mondayToFriday}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-flipr-orange mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t.address}</h3>
                    <p className="text-muted-foreground">123 Main Street, Suite 100</p>
                    <p className="text-muted-foreground">Austin, TX 78701</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.faq}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">{t.howDoISignUp}</h3>
                  <p className="text-muted-foreground">{t.signUpAnswer}</p>
                </div>

                <div>
                  <h3 className="font-medium">{t.whatAreTheFees}</h3>
                  <p className="text-muted-foreground">{t.feesAnswer}</p>
                </div>

                <div>
                  <h3 className="font-medium">{t.howDoIListProperty}</h3>
                  <p className="text-muted-foreground">{t.listPropertyAnswer}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

