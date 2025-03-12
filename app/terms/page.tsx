"use client"

import { DashboardLayout } from "@/components/templates/DashboardLayout"
import { useTranslations } from "@/hooks/use-translations"
import { Skeleton } from "@/components/ui/skeleton"

export default function TermsPage() {
  const t = useTranslations()

  // Check if translations are loaded - only check for language property which is always available
  const isLoading = !t || !t.language

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container py-12 max-w-4xl">
          <Skeleton className="h-10 w-64 mb-8" />

          <div className="space-y-8">
            <Skeleton className="h-6 w-full mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">{t.terms}</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">{t.termsLastUpdated}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsAgreementTitle}</h2>
            <p>{t.termsAgreementText1}</p>
            <p>{t.termsAgreementText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsEligibilityTitle}</h2>
            <p>{t.termsEligibilityText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsAccountsTitle}</h2>
            <p>{t.termsAccountsText1}</p>
            <p>{t.termsAccountsText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsUserTypesTitle}</h2>
            <h3 className="text-xl font-medium mb-3">{t.termsHomeownersTitle}</h3>
            <p>{t.termsHomeownersText}</p>

            <h3 className="text-xl font-medium mb-3">{t.termsInvestorsTitle}</h3>
            <p>{t.termsInvestorsText}</p>

            <h3 className="text-xl font-medium mb-3">{t.termsContractorsTitle}</h3>
            <p>{t.termsContractorsText}</p>

            <h3 className="text-xl font-medium mb-3">{t.termsLendersTitle}</h3>
            <p>{t.termsLendersText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsSubscriptionTitle}</h2>
            <p>{t.termsSubscriptionText1}</p>
            <p>{t.termsSubscriptionText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsUserContentTitle}</h2>
            <p>{t.termsUserContentText1}</p>
            <p>{t.termsUserContentText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsProhibitedTitle}</h2>
            <p>{t.termsProhibitedText}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t.termsProhibitedList1}</li>
              <li>{t.termsProhibitedList2}</li>
              <li>{t.termsProhibitedList3}</li>
              <li>{t.termsProhibitedList4}</li>
              <li>{t.termsProhibitedList5}</li>
              <li>{t.termsProhibitedList6}</li>
              <li>{t.termsProhibitedList7}</li>
              <li>{t.termsProhibitedList8}</li>
              <li>{t.termsProhibitedList9}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsIntellectualTitle}</h2>
            <p>{t.termsIntellectualText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsDisclaimerTitle}</h2>
            <p>{t.termsDisclaimerText1}</p>
            <p>{t.termsDisclaimerText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsLiabilityTitle}</h2>
            <p>{t.termsLiabilityText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsIndemnificationTitle}</h2>
            <p>{t.termsIndemnificationText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsTerminationTitle}</h2>
            <p>{t.termsTerminationText1}</p>
            <p>{t.termsTerminationText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsChangesTitle}</h2>
            <p>{t.termsChangesText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsGoverningTitle}</h2>
            <p>{t.termsGoverningText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.termsContactTitle}</h2>
            <p>{t.termsContactText}</p>
            <p className="mt-2">
              {t.termsContactEmail}
              <br />
              {t.termsContactAddress}
              <br />
              {t.termsContactPhone}
            </p>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

