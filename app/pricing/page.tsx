"use client"

import type React from "react"

import Link from "next/link"
import { Check, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import MainLayout from "@/components/main-layout"
import { useTranslations } from "@/hooks/use-translations"

export default function PricingPage() {
  const t = useTranslations()

  return (
    <MainLayout>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.pricingTitle}</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t.pricingSubtitle}</p>
            </div>
          </div>

          <Tabs defaultValue="monthly" className="mt-12 w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">{t.monthly}</TabsTrigger>
                <TabsTrigger value="annually">{t.annually}</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Homeowner Plan */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.homeownerPlan}</CardTitle>
                    <CardDescription>{t.homeownerPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{t.free}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.listProperties}</FeatureItem>
                      <FeatureItem included>{t.connectWithInvestors}</FeatureItem>
                      <FeatureItem included>{t.basicAnalytics}</FeatureItem>
                      <FeatureItem included={false}>{t.advancedAnalytics}</FeatureItem>
                      <FeatureItem included={false}>{t.prioritySupport}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Investor Plan */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.investorPlan}</CardTitle>
                    <CardDescription>{t.investorPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$20</span>
                      <span className="text-muted-foreground ml-1">{t.perMonth}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.browseAllProperties}</FeatureItem>
                      <FeatureItem included>{t.advancedFiltering}</FeatureItem>
                      <FeatureItem included>{t.investmentAnalytics}</FeatureItem>
                      <FeatureItem included>{t.aiProjectAnalysis}</FeatureItem>
                      <FeatureItem included>{t.connectWithContractors}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Contractor Plan */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.contractorPlan}</CardTitle>
                    <CardDescription>{t.contractorPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$20</span>
                      <span className="text-muted-foreground ml-1">{t.perMonth}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.businessProfile}</FeatureItem>
                      <FeatureItem included>{t.projectDiscovery}</FeatureItem>
                      <FeatureItem included>{t.bidOnProjects}</FeatureItem>
                      <FeatureItem included>{t.projectManagement}</FeatureItem>
                      <FeatureItem included>{t.paymentProcessing}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Lender Plan */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0">
                    <div className="bg-flipr-orange text-white px-3 py-1 rotate-45 translate-x-2 translate-y-3 text-xs font-semibold">
                      {t.popular}
                    </div>
                  </div>
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.lenderPlan}</CardTitle>
                    <CardDescription>{t.lenderPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$50</span>
                      <span className="text-muted-foreground ml-1">{t.perMonth}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.lenderProfile}</FeatureItem>
                      <FeatureItem included>{t.loanRequestDashboard}</FeatureItem>
                      <FeatureItem included>{t.advancedRiskAnalysis}</FeatureItem>
                      <FeatureItem included>{t.loanManagement}</FeatureItem>
                      <FeatureItem included>{t.priorityPlacement}</FeatureItem>
                      <FeatureItem included>{t.dedicatedSupport}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-flipr-orange hover:bg-flipr-orange/90" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="annually" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Homeowner Plan - Annual */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.homeownerPlan}</CardTitle>
                    <CardDescription>{t.homeownerPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{t.free}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.listProperties}</FeatureItem>
                      <FeatureItem included>{t.connectWithInvestors}</FeatureItem>
                      <FeatureItem included>{t.basicAnalytics}</FeatureItem>
                      <FeatureItem included={false}>{t.advancedAnalytics}</FeatureItem>
                      <FeatureItem included={false}>{t.prioritySupport}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Investor Plan - Annual */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.investorPlan}</CardTitle>
                    <CardDescription>{t.investorPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$192</span>
                      <span className="text-muted-foreground ml-1">{t.perYear}</span>
                      <div className="text-sm text-green-600 font-medium mt-1">
                        {t.savePercent.replace("{percent}", "20%")}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.browseAllProperties}</FeatureItem>
                      <FeatureItem included>{t.advancedFiltering}</FeatureItem>
                      <FeatureItem included>{t.investmentAnalytics}</FeatureItem>
                      <FeatureItem included>{t.aiProjectAnalysis}</FeatureItem>
                      <FeatureItem included>{t.connectWithContractors}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Contractor Plan - Annual */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow">
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.contractorPlan}</CardTitle>
                    <CardDescription>{t.contractorPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$192</span>
                      <span className="text-muted-foreground ml-1">{t.perYear}</span>
                      <div className="text-sm text-green-600 font-medium mt-1">
                        {t.savePercent.replace("{percent}", "20%")}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.businessProfile}</FeatureItem>
                      <FeatureItem included>{t.projectDiscovery}</FeatureItem>
                      <FeatureItem included>{t.bidOnProjects}</FeatureItem>
                      <FeatureItem included>{t.projectManagement}</FeatureItem>
                      <FeatureItem included>{t.paymentProcessing}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Lender Plan - Annual */}
                <Card className="flex flex-col border-2 border-flipr-orange/10 flipr-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0">
                    <div className="bg-flipr-orange text-white px-3 py-1 rotate-45 translate-x-2 translate-y-3 text-xs font-semibold">
                      {t.popular}
                    </div>
                  </div>
                  <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-xl">{t.lenderPlan}</CardTitle>
                    <CardDescription>{t.lenderPlanDesc}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$480</span>
                      <span className="text-muted-foreground ml-1">{t.perYear}</span>
                      <div className="text-sm text-green-600 font-medium mt-1">
                        {t.savePercent.replace("{percent}", "20%")}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                      <FeatureItem included>{t.lenderProfile}</FeatureItem>
                      <FeatureItem included>{t.loanRequestDashboard}</FeatureItem>
                      <FeatureItem included>{t.advancedRiskAnalysis}</FeatureItem>
                      <FeatureItem included>{t.loanManagement}</FeatureItem>
                      <FeatureItem included>{t.priorityPlacement}</FeatureItem>
                      <FeatureItem included>{t.dedicatedSupport}</FeatureItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-flipr-orange hover:bg-flipr-orange/90" asChild>
                      <Link href="/signup">{t.getStarted}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Feature Comparison Table */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{t.featureComparison}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-6 text-left">{t.features}</th>
                    <th className="py-4 px-6 text-center">{t.homeownerPlan}</th>
                    <th className="py-4 px-6 text-center">{t.investorPlan}</th>
                    <th className="py-4 px-6 text-center">{t.contractorPlan}</th>
                    <th className="py-4 px-6 text-center">{t.lenderPlan}</th>
                  </tr>
                </thead>
                <tbody>
                  <FeatureRow
                    feature={t.propertyListings}
                    homeowner={true}
                    investor={true}
                    contractor={true}
                    lender={true}
                  />
                  <FeatureRow
                    feature={t.aiAnalysis}
                    homeowner={false}
                    investor={true}
                    contractor={true}
                    lender={true}
                    tooltip={t.aiAnalysisTooltip}
                  />
                  <FeatureRow
                    feature={t.advancedFiltering}
                    homeowner={false}
                    investor={true}
                    contractor={false}
                    lender={true}
                  />
                  <FeatureRow
                    feature={t.marketAnalytics}
                    homeowner={false}
                    investor={true}
                    contractor={false}
                    lender={true}
                  />
                  <FeatureRow
                    feature={t.projectManagement}
                    homeowner={false}
                    investor={true}
                    contractor={true}
                    lender={false}
                  />
                  <FeatureRow
                    feature={t.loanManagement}
                    homeowner={false}
                    investor={false}
                    contractor={false}
                    lender={true}
                  />
                  <FeatureRow
                    feature={t.prioritySupport}
                    homeowner={false}
                    investor={false}
                    contractor={false}
                    lender={true}
                  />
                  <FeatureRow
                    feature={t.apiAccess}
                    homeowner={false}
                    investor={false}
                    contractor={false}
                    lender={true}
                    tooltip={t.apiAccessTooltip}
                  />
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{t.frequentlyAskedQuestions}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t.faqBilling}</AccordionTrigger>
                <AccordionContent>{t.faqBillingAnswer}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t.faqCancel}</AccordionTrigger>
                <AccordionContent>{t.faqCancelAnswer}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t.faqRefund}</AccordionTrigger>
                <AccordionContent>{t.faqRefundAnswer}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t.faqUpgrade}</AccordionTrigger>
                <AccordionContent>{t.faqUpgradeAnswer}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>{t.faqTeam}</AccordionTrigger>
                <AccordionContent>{t.faqTeamAnswer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">{t.readyToStart}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t.readyToStartDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-flipr-orange hover:bg-flipr-orange/90" asChild>
                <Link href="/signup">{t.signUpNow}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-flipr-orange text-flipr-orange hover:bg-flipr-orange/10"
                asChild
              >
                <Link href="/contact">{t.contactSales}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

// Helper component for feature items in pricing cards
function FeatureItem({ included, children }: { included: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <Check className="h-4 w-4 text-green-500 mt-0.5" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground mt-0.5" />
      )}
      <span className={included ? "" : "text-muted-foreground"}>{children}</span>
    </li>
  )
}

// Helper component for feature comparison rows
function FeatureRow({
  feature,
  homeowner,
  investor,
  contractor,
  lender,
  tooltip,
}: {
  feature: string
  homeowner: boolean
  investor: boolean
  contractor: boolean
  lender: boolean
  tooltip?: string
}) {
  const FeatureCell = ({ included }: { included: boolean }) => (
    <td className="py-4 px-6 text-center">
      {included ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground mx-auto" />
      )}
    </td>
  )

  return (
    <tr className="border-b">
      <td className="py-4 px-6 text-left">
        <div className="flex items-center gap-1">
          {feature}
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </td>
      <FeatureCell included={homeowner} />
      <FeatureCell included={investor} />
      <FeatureCell included={contractor} />
      <FeatureCell included={lender} />
    </tr>
  )
}

