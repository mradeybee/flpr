"use client"

import { DashboardLayout } from "@/components/templates/DashboardLayout"
import { useTranslations } from "@/hooks/use-translations"
import { Skeleton } from "@/components/ui/skeleton"

export default function PrivacyPage() {
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
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2 pl-6">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2 pl-6">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">{t.privacy}</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">{t.privacyLastUpdated}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyIntroTitle}</h2>
            <p>{t.privacyIntroText1}</p>
            <p>{t.privacyIntroText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyCollectTitle}</h2>
            <h3 className="text-xl font-medium mb-3">{t.privacyPersonalInfoTitle}</h3>
            <p>{t.privacyPersonalInfoText}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t.privacyPersonalInfoList1}</li>
              <li>{t.privacyPersonalInfoList2}</li>
              <li>{t.privacyPersonalInfoList3}</li>
              <li>{t.privacyPersonalInfoList4}</li>
              <li>{t.privacyPersonalInfoList5}</li>
              <li>{t.privacyPersonalInfoList6}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">{t.privacyUsageInfoTitle}</h3>
            <p>{t.privacyUsageInfoText}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t.privacyUsageInfoList1}</li>
              <li>{t.privacyUsageInfoList2}</li>
              <li>{t.privacyUsageInfoList3}</li>
              <li>{t.privacyUsageInfoList4}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyUseTitle}</h2>
            <p>{t.privacyUseText}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t.privacyUseList1}</li>
              <li>{t.privacyUseList2}</li>
              <li>{t.privacyUseList3}</li>
              <li>{t.privacyUseList4}</li>
              <li>{t.privacyUseList5}</li>
              <li>{t.privacyUseList6}</li>
              <li>{t.privacyUseList7}</li>
              <li>{t.privacyUseList8}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacySharingTitle}</h2>
            <p>{t.privacySharingText}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t.privacySharingList1}</li>
              <li>{t.privacySharingList2}</li>
              <li>{t.privacySharingList3}</li>
              <li>{t.privacySharingList4}</li>
            </ul>
            <p>{t.privacySharingText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacySecurityTitle}</h2>
            <p>{t.privacySecurityText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyRightsTitle}</h2>
            <p>{t.privacyRightsText}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t.privacyRightsList1}</li>
              <li>{t.privacyRightsList2}</li>
              <li>{t.privacyRightsList3}</li>
              <li>{t.privacyRightsList4}</li>
              <li>{t.privacyRightsList5}</li>
            </ul>
            <p>{t.privacyRightsText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyCookiesTitle}</h2>
            <p>{t.privacyCookiesText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyChildrenTitle}</h2>
            <p>{t.privacyChildrenText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyChangesTitle}</h2>
            <p>{t.privacyChangesText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacyContactTitle}</h2>
            <p>{t.privacyContactText}</p>
            <p className="mt-2">
              {t.privacyContactEmail}
              <br />
              {t.privacyContactAddress}
              <br />
              {t.privacyContactPhone}
            </p>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

