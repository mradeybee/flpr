"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "@/hooks/use-translations"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  userType: string
  popular?: boolean
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  userType,
  popular = false,
}: PricingCardProps) {
  const t = useTranslations()

  return (
    <Card
      className={`flex flex-col border-2 ${popular ? "border-flipr-orange" : "border-flipr-orange/10"} flipr-shadow relative overflow-hidden`}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-flipr-orange text-white px-3 py-1 rotate-45 translate-x-2 translate-y-3 text-xs font-semibold">
            {t.popular}
          </div>
        </div>
      )}
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground ml-1">{period}</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${popular ? "bg-flipr-orange hover:bg-flipr-orange/90" : ""}`} asChild>
          <Link href={`/signup?plan=${userType}`}>{t.getStarted}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

