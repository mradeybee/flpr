"use client"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivityFeed } from "@/components/organisms/activities/activity-feed"
import { ActivityFilters } from "./activity-filters"
import { Search, Calendar } from "lucide-react"

// Mock data for activities
import { mockActivities } from "@/data/mock-activities"

export default function Activities() {
  const t = useTranslations()
  const [activities, setActivities] = useState(mockActivities)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("all")

  // Filter activities based on tab, search query, and date range
  const filteredActivities = activities.filter((activity) => {
    // Filter by tab
    if (activeTab !== "all" && activity.type !== activeTab) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by date range
    if (dateRange !== "all") {
      const now = new Date()
      const activityDate = new Date(activity.timestamp)

      switch (dateRange) {
        case "today":
          return (
            activityDate.getDate() === now.getDate() &&
            activityDate.getMonth() === now.getMonth() &&
            activityDate.getFullYear() === now.getFullYear()
          )
        case "week":
          const oneWeekAgo = new Date(now)
          oneWeekAgo.setDate(now.getDate() - 7)
          return activityDate >= oneWeekAgo
        case "month":
          const oneMonthAgo = new Date(now)
          oneMonthAgo.setMonth(now.getMonth() - 1)
          return activityDate >= oneMonthAgo
        default:
          return true
      }
    }

    return true
  })

  return (
    <div >
      <div className="flex flex-col space-y-6">


        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with filters */}
          <div className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{t.filters}</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFilters dateRange={dateRange} setDateRange={setDateRange} />
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Search and filter bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t.searchActivities}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t.selectDateRange} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allTime}</SelectItem>
                    <SelectItem value="today">{t.today}</SelectItem>
                    <SelectItem value="week">{t.pastWeek}</SelectItem>
                    <SelectItem value="month">{t.pastMonth}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Activity tabs and feed */}
            <Card>
              <CardHeader className="pb-0">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="all">{t.all}</TabsTrigger>
                    <TabsTrigger value="property">{t.properties}</TabsTrigger>
                    <TabsTrigger value="message">{t.messages}</TabsTrigger>
                    <TabsTrigger value="document">{t.documents}</TabsTrigger>
                    <TabsTrigger value="investment">{t.investments}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="pt-6">
                <ActivityFeed activities={filteredActivities} />

                {filteredActivities.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{t.noActivitiesFound}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("")
                        setDateRange("all")
                        setActiveTab("all")
                      }}
                    >
                      {t.clearFilters}
                    </Button>
                  </div>
                )}

                {filteredActivities.length > 0 && (
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">{t.loadMore}</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

