"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Hammer, DollarSign, User, Mail, Lock } from "lucide-react"
import { MainLayout } from "@/components/templates/MainLayout"
import { useTranslations } from "@/hooks/use-translations"
import { useAuth } from "@/contexts/auth-context"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations()
  const { user } = useAuth()

  // If user is already logged in, redirect to dashboard
  if (user) {
    router.push("/dashboard")
    return null
  }

  // Check if a plan type was passed in the URL
  useEffect(() => {
    const plan = searchParams.get("plan")
    if (plan && ["homeowner", "investor", "contractor", "lender"].includes(plan)) {
      setUserType(plan)
      setStep(2)
    }
  }, [searchParams])

  const handleUserTypeSelect = (type: string) => {
    setUserType(type)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <MainLayout>
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-flipr-orange">{t.appName}</h1>
            </Link>
            <p className="text-muted-foreground mt-2">{t.createAccount}</p>
          </div>

          {step === 1 ? (
            <Card className="border-2 border-flipr-orange/10 flipr-shadow">
              <CardHeader>
                <CardTitle>{t.chooseAccountType}</CardTitle>
                <CardDescription>{t.selectAccountType}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className={`border-2 cursor-pointer transition-all hover:border-flipr-orange ${userType === "homeowner" ? "border-flipr-orange bg-flipr-orange/5" : ""}`}
                    onClick={() => handleUserTypeSelect("homeowner")}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-flipr-orange/10 flex items-center justify-center mb-3">
                        <Home className="h-6 w-6 text-flipr-orange" />
                      </div>
                      <h3 className="font-medium">{t.homeowner}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{t.homeownerDesc}</p>
                      <div className="mt-2 text-xs font-medium text-green-600">{t.free}</div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border-2 cursor-pointer transition-all hover:border-flipr-orange ${userType === "investor" ? "border-flipr-orange bg-flipr-orange/5" : ""}`}
                    onClick={() => handleUserTypeSelect("investor")}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-flipr-orange/10 flex items-center justify-center mb-3">
                        <User className="h-6 w-6 text-flipr-orange" />
                      </div>
                      <h3 className="font-medium">{t.investor}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{t.investorDesc}</p>
                      <div className="mt-2 text-xs font-medium">$20/month</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className={`border-2 cursor-pointer transition-all hover:border-flipr-orange ${userType === "lender" ? "border-flipr-orange bg-flipr-orange/5" : ""}`}
                    onClick={() => handleUserTypeSelect("lender")}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-flipr-orange/10 flex items-center justify-center mb-3">
                        <DollarSign className="h-6 w-6 text-flipr-orange" />
                      </div>
                      <h3 className="font-medium">{t.lender}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{t.lenderDesc}</p>
                      <div className="mt-2 text-xs font-medium">$50/month</div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border-2 cursor-pointer transition-all hover:border-flipr-orange ${userType === "contractor" ? "border-flipr-orange bg-flipr-orange/5" : ""}`}
                    onClick={() => handleUserTypeSelect("contractor")}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-flipr-orange/10 flex items-center justify-center mb-3">
                        <Hammer className="h-6 w-6 text-flipr-orange" />
                      </div>
                      <h3 className="font-medium">{t.contractor}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{t.contractorDesc}</p>
                      <div className="mt-2 text-xs font-medium">$20/month</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-center text-sm text-muted-foreground w-full">
                  {t.alreadyHaveAccount}{" "}
                  <Link href="/login" className="text-flipr-orange hover:underline">
                    {t.signIn}
                  </Link>
                </p>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-2 border-flipr-orange/10 flipr-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{t.createYourAccount}</CardTitle>
                  <Badge userType={userType} />
                </div>
                <CardDescription>{t.fillDetailsToCompleteRegistration}</CardDescription>
                {userType !== "homeowner" && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">
                      {userType === "lender" ? "$50" : "$20"}
                      {t.perMonth}
                    </span>
                    <span className="text-muted-foreground ml-1">- {t.freeTrialPeriod}</span>
                  </div>
                )}
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">{t.firstName}</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">{t.lastName}</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="name@example.com" className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" className="pl-10" required />
                    </div>
                    <p className="text-xs text-muted-foreground">{t.passwordRequirements}</p>
                  </div>

                  {userType === "homeowner" && (
                    <div className="space-y-2">
                      <Label>{t.propertyStatus}</Label>
                      <RadioGroup defaultValue="ready">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ready" id="ready" />
                          <Label htmlFor="ready">{t.readyToListNow}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="soon" id="soon" />
                          <Label htmlFor="soon">{t.planningToListSoon}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="exploring" id="exploring" />
                          <Label htmlFor="exploring">{t.justExploringOptions}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {userType === "contractor" && (
                    <div className="space-y-2">
                      <Label>{t.servicesOffered}</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="general" />
                          <label htmlFor="general" className="text-sm">
                            {t.generalContracting}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="plumbing" />
                          <label htmlFor="plumbing" className="text-sm">
                            {t.plumbing}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="electrical" />
                          <label htmlFor="electrical" className="text-sm">
                            {t.electrical}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="hvac" />
                          <label htmlFor="hvac" className="text-sm">
                            {t.hvac}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="roofing" />
                          <label htmlFor="roofing" className="text-sm">
                            {t.roofing}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="painting" />
                          <label htmlFor="painting" className="text-sm">
                            {t.painting}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {userType === "lender" && (
                    <div className="space-y-2">
                      <Label>{t.lendingPreferences}</Label>
                      <RadioGroup defaultValue="hard">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hard" id="hard" />
                          <Label htmlFor="hard">{t.hardMoneyLoans}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" />
                          <Label htmlFor="private">{t.privateLending}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">{t.bothTypes}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {userType !== "homeowner" && (
                    <div className="space-y-2">
                      <Label>{t.billingCycle}</Label>
                      <RadioGroup defaultValue="monthly">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">
                            {t.monthly} - ${userType === "lender" ? "50" : "20"}
                            {t.perMonth}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="annually" id="annually" />
                          <Label htmlFor="annually">
                            {t.annually} - ${userType === "lender" ? "480" : "192"}
                            {t.perYear}
                            <span className="ml-2 text-xs text-green-600 font-medium">
                              {t.savePercent.replace("{percent}", "20%")}
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {userType !== "homeowner" && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <label htmlFor="terms" className="text-sm">
                          {t.agreeToTerms}{" "}
                          <Link href="/terms" className="text-flipr-orange hover:underline">
                            {t.termsOfService}
                          </Link>{" "}
                          {t.and}{" "}
                          <Link href="/privacy" className="text-flipr-orange hover:underline">
                            {t.privacyPolicy}
                          </Link>
                        </label>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-flipr-orange hover:bg-flipr-orange/90"
                    disabled={isLoading}
                  >
                    {isLoading ? t.creatingAccount : t.createAccount}
                  </Button>
                  <div className="flex items-center justify-between w-full">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-sm">
                      {t.back}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {t.alreadyHaveAccount}{" "}
                      <Link href="/login" className="text-flipr-orange hover:underline">
                        {t.signIn}
                      </Link>
                    </p>
                  </div>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

// Badge component to show selected user type
function Badge({ userType }: { userType: string }) {
  let icon = <User className="h-3 w-3 mr-1" />
  const color = "bg-flipr-orange/10 text-flipr-orange border-flipr-orange/20"

  if (userType === "homeowner") {
    icon = <Home className="h-3 w-3 mr-1" />
  } else if (userType === "lender") {
    icon = <DollarSign className="h-3 w-3 mr-1" />
  } else if (userType === "contractor") {
    icon = <Hammer className="h-3 w-3 mr-1" />
  } else if (userType === "investor") {
    icon = <User className="h-3 w-3 mr-1" />
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${color}`}>
      {icon}
      {userType.charAt(0).toUpperCase() + userType.slice(1)}
    </span>
  )
}

