"use client"
import { useTranslations } from "@/hooks/use-translations"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Check, Plus, DollarSign, Calendar, ArrowRight } from "lucide-react"

export function BillingSettings() {
  const t = useTranslations()

  // Mock data for current plan
  const currentPlan = {
    name: "Investor",
    price: "$29",
    interval: "month",
    features: [
      "browseAllProperties",
      "advancedFiltering",
      "investmentAnalytics",
      "aiAnalysis",
      "connectWithContractors",
    ],
    nextBillingDate: "April 15, 2025",
  }

  // Mock data for payment methods
  const paymentMethods = [
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.billing}</h3>
        <div className="text-sm text-muted-foreground">
          {t.billingPreferences}
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-4 flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            {t.currentPlan}
          </h4>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{t[currentPlan.name.toLowerCase() + "Plan"]}</CardTitle>
                <Badge className="bg-flipr-orange">{t.active}</Badge>
              </div>
              <CardDescription>
                {currentPlan.price}/{t[currentPlan.interval]}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-flipr-orange" />
                    <span className="text-sm">{t[feature]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {t.nextBillingOn}: {currentPlan.nextBillingDate}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t.changePlan}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Separator />

        <div>
          <h4 className="text-md font-medium mb-4 flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            {t.paymentMethods}
          </h4>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-muted rounded-md">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium capitalize">
                          {method.brand} •••• {method.last4}
                          {method.isDefault && (
                            <Badge variant="outline" className="ml-2">
                              {t.default}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t.expires} {method.expMonth}/{method.expYear}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {t.edit}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              {t.addPaymentMethod}
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-md font-medium mb-4">{t.billingHistory}</h4>
          <Card>
            <CardContent className="p-4">
              <div className="text-center py-4 text-muted-foreground">
                {t.noBillingHistory}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

