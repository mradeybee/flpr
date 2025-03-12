"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Home, Hammer, DollarSign, BarChart3, Brain } from "lucide-react"
import { MainLayout } from "@/components/templates/MainLayout"
import { useTranslations } from "@/hooks/use-translations"
import { PricingCard } from "@/components/molecules/PricingCard"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const t = useTranslations()
  const { user } = useAuth()
  const router = useRouter()

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user])

  // If user is logged in, don't render the homepage content
  if (user) return null

  return (
    <MainLayout>
      <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">{t.heroTitle}</h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">{t.heroSubtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button size="lg" className="gap-1 bg-white text-flipr-orange hover:bg-white/90">
                  {t.browseProperties}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-flipr-orange hover:bg-white/10 hover:text-white"
                >
                  {t.joinFlipr}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.howItWorks}</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t.howItWorksSubtitle}</p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            <Card className="flex flex-col items-center text-center card-gradient border-2 border-flipr-orange/10 flipr-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flipr-orange/10 mb-4">
                  <Home className="h-8 w-8 text-flipr-orange" />
                </div>
                <CardTitle>{t.listProperty}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.listPropertyDesc}</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center card-gradient border-2 border-flipr-orange/10 flipr-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flipr-orange/10 mb-4">
                  <BarChart3 className="h-8 w-8 text-flipr-orange" />
                </div>
                <CardTitle>{t.analyzeInvest}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.analyzeInvestDesc}</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center card-gradient border-2 border-flipr-orange/10 flipr-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flipr-orange/10 mb-4">
                  <DollarSign className="h-8 w-8 text-flipr-orange" />
                </div>
                <CardTitle>{t.secureFunding}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.secureFundingDesc}</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center card-gradient border-2 border-flipr-orange/10 flipr-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flipr-orange/10 mb-4">
                  <Hammer className="h-8 w-8 text-flipr-orange" />
                </div>
                <CardTitle>{t.hireContractors}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.hireContractorsDesc}</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Link href="/project-analysis">
              <Button size="lg" className="bg-flipr-orange hover:bg-flipr-orange/90">
                <Brain className="mr-2 h-5 w-5" />
                {t.tryAIAnalysis}
              </Button>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{t.aiAnalysisDesc}</p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.pricingPlans}</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t.pricingPlansDesc}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8 max-w-5xl">
              <PricingCard
                title={t.homeownerPlan}
                price={t.free}
                description={t.homeownerPlanDesc}
                features={[t.listProperties, t.connectWithInvestors, t.basicAnalytics]}
                userType="homeowner"
              />
              <PricingCard
                title={t.investorPlan}
                price="$20"
                period={t.perMonth}
                description={t.investorPlanDesc}
                features={[t.browseAllProperties, t.advancedFiltering, t.investmentAnalytics]}
                userType="investor"
              />
              <PricingCard
                title={t.contractorPlan}
                price="$20"
                period={t.perMonth}
                description={t.contractorPlanDesc}
                features={[t.businessProfile, t.projectDiscovery, t.bidOnProjects]}
                userType="contractor"
              />
              <PricingCard
                title={t.lenderPlan}
                price="$50"
                period={t.perMonth}
                description={t.lenderPlanDesc}
                features={[t.lenderProfile, t.loanRequestDashboard, t.advancedRiskAnalysis]}
                userType="lender"
                popular={true}
              />
            </div>
            <div className="mt-8">
              <Button
                variant="outline"
                className="border-flipr-orange text-flipr-orange hover:bg-flipr-orange/10"
                asChild
              >
                <Link href="/pricing">{t.viewAllFeatures}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 accent-gradient text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                {t.joinCommunity}
              </h2>
              <p className="text-white md:text-xl">{t.joinCommunityDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-flipr-orange hover:bg-white/90">
                    {t.getStarted}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-white">500+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{t.activeProperties}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-white">$25M+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{t.fundedProjects}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-white">300+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{t.verifiedContractors}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-white">50+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{t.lendingPartners}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

