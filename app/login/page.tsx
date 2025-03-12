"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Github, ChromeIcon as Google, Facebook } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { MainLayout } from "@/components/templates/MainLayout"
import { useTranslations } from "@/hooks/use-translations"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const t = useTranslations()
  const { login, user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Flipr!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-flipr-orange">{t.appName}</h1>
            </Link>
            <p className="text-muted-foreground mt-2">{t.signInToAccount}</p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">{t.socialLogin}</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                <CardHeader>
                  <CardTitle>{t.signIn}</CardTitle>
                  <CardDescription>{t.enterCredentials}</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">{t.password}</Label>
                        <Link href="/forgot-password" className="text-xs text-flipr-orange hover:underline">
                          {t.forgotPassword}
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          className="pl-10"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t.rememberMe}
                      </label>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Demo accounts:</p>
                      <ul className="list-disc pl-5 mt-1">
                        <li>homeowner@email.com / homeowner</li>
                        <li>investor@email.com / investor</li>
                        <li>contractor@email.com / contractor</li>
                        <li>lender@flpr.com / lender</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-flipr-orange hover:bg-flipr-orange/90"
                      disabled={isLoading}
                    >
                      {isLoading ? t.signingIn : t.signIn}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      {t.noAccount}{" "}
                      <Link href="/signup" className="text-flipr-orange hover:underline">
                        {t.signUp}
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                <CardHeader>
                  <CardTitle>{t.socialLogin}</CardTitle>
                  <CardDescription>{t.socialMediaSignIn}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-flipr-orange/20 hover:bg-flipr-orange/5 hover:border-flipr-orange/30"
                    onClick={() => router.push("/dashboard")}
                  >
                    <Google className="mr-2 h-4 w-4" />
                    {t.continueWithGoogle}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-flipr-orange/20 hover:bg-flipr-orange/5 hover:border-flipr-orange/30"
                    onClick={() => router.push("/dashboard")}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    {t.continueWithFacebook}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-flipr-orange/20 hover:bg-flipr-orange/5 hover:border-flipr-orange/30"
                    onClick={() => router.push("/dashboard")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {t.continueWithGithub}
                  </Button>
                </CardContent>
                <CardFooter>
                  <p className="text-center text-sm text-muted-foreground w-full">
                    {t.noAccount}{" "}
                    <Link href="/signup" className="text-flipr-orange hover:underline">
                      {t.signUp}
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}

