"use client"

import { useTranslations } from "@/hooks/use-translations"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar, RotateCcw } from "lucide-react"

interface ActivityFiltersProps {
  dateRange: string
  setDateRange: (value: string) => void
}

export function ActivityFilters({ dateRange, setDateRange }: ActivityFiltersProps) {
  const t = useTranslations()

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-flipr-orange" />
          <h3 className="font-medium text-sm">{t.dateRange || "Date Range"}</h3>
        </div>

        <RadioGroup value={dateRange} onValueChange={setDateRange} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">{t.allTime || "All time"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="today" id="today" />
            <Label htmlFor="today">{t.today || "Today"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="week" />
            <Label htmlFor="week">{t.pastWeek || "Past week"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="month" id="month" />
            <Label htmlFor="month">{t.pastMonth || "Past month"}</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Activity Type Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">{t.activityTypes || "Activity Types"}</h3>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="type-property" defaultChecked />
            <Label htmlFor="type-property">{t.properties || "Properties"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-message" defaultChecked />
            <Label htmlFor="type-message">{t.messages || "Messages"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-document" defaultChecked />
            <Label htmlFor="type-document">{t.documents || "Documents"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-investment" defaultChecked />
            <Label htmlFor="type-investment">{t.investments || "Investments"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-contractor" defaultChecked />
            <Label htmlFor="type-contractor">{t.contractors || "Contractors"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-lender" defaultChecked />
            <Label htmlFor="type-lender">{t.lenders || "Lenders"}</Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Status Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">{t.status || "Status"}</h3>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="status-completed" defaultChecked />
            <Label htmlFor="status-completed">{t.completed || "Completed"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-pending" defaultChecked />
            <Label htmlFor="status-pending">{t.pending || "Pending"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-failed" defaultChecked />
            <Label htmlFor="status-failed">{t.failed || "Failed"}</Label>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" size="sm">
        <RotateCcw className="mr-2 h-3 w-3" />
        {t.resetFilters || "Reset filters"}
      </Button>
    </div>
  )
}

