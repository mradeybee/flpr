"use client"

import { useTranslations } from "@/hooks/use-translations"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ActivityContextMenu } from "./activity-context-menu"
import {
  Home,
  MessageSquare,
  FileText,
  DollarSign,
  User,
  Wrench,
  CreditCard,
  Eye,
  Star,
  MessageCircle,
  Upload,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { enUS, es } from "date-fns/locale"

// Define the Activity type
export interface Activity {
  id: string
  type: "property" | "message" | "document" | "investment" | "user" | "contractor" | "lender"
  action: string
  title: string
  description: string
  timestamp: string
  status?: "completed" | "pending" | "failed"
  user?: {
    name: string
    avatar?: string
  }
  entity?: {
    id: string
    name: string
    image?: string
  }
  metadata?: Record<string, any>
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const t = useTranslations()

  // Get the appropriate locale for date formatting
  const locale = t.language === "es" ? es : enUS

  // Function to get the appropriate icon for an activity type
  const getActivityIcon = (type: Activity["type"], action: string) => {
    switch (type) {
      case "property":
        if (action === "viewed") return <Eye className="h-5 w-5 text-blue-500" />
        if (action === "favorited") return <Star className="h-5 w-5 text-yellow-500" />
        return <Home className="h-5 w-5 text-flipr-orange" />
      case "message":
        return <MessageCircle className="h-5 w-5 text-green-500" />
      case "document":
        if (action === "uploaded") return <Upload className="h-5 w-5 text-purple-500" />
        if (action === "downloaded") return <Download className="h-5 w-5 text-indigo-500" />
        return <FileText className="h-5 w-5 text-blue-500" />
      case "investment":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "user":
        return <User className="h-5 w-5 text-gray-500" />
      case "contractor":
        return <Wrench className="h-5 w-5 text-orange-500" />
      case "lender":
        return <CreditCard className="h-5 w-5 text-purple-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  // Function to get the status icon
  const getStatusIcon = (status?: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  // Function to get the status text
  const getStatusText = (status?: Activity["status"]) => {
    switch (status) {
      case "completed":
        return t.completed || "Completed"
      case "pending":
        return t.pending || "Pending"
      case "failed":
        return t.failed || "Failed"
      default:
        return ""
    }
  }

  // Function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale,
      })
    } catch (error) {
      return timestamp
    }
  }

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={activity.id}>
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                {getActivityIcon(activity.type, activity.action)}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  {activity.status && (
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "outline"
                          : activity.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="flex items-center gap-1"
                    >
                      {getStatusIcon(activity.status)}
                      <span>{getStatusText(activity.status)}</span>
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                  <ActivityContextMenu activityId={activity.id} activityType={activity.type} />
                </div>
              </div>

              {activity.entity && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                  {activity.entity.image ? (
                    <img
                      src={activity.entity.image || "/placeholder.svg"}
                      alt={activity.entity.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                      {activity.type === "property" && <Home className="h-6 w-6 text-flipr-orange" />}
                      {activity.type === "message" && <MessageSquare className="h-6 w-6 text-green-500" />}
                      {activity.type === "document" && <FileText className="h-6 w-6 text-blue-500" />}
                      {activity.type === "investment" && <DollarSign className="h-6 w-6 text-green-500" />}
                      {activity.type === "contractor" && <Wrench className="h-6 w-6 text-orange-500" />}
                      {activity.type === "lender" && <CreditCard className="h-6 w-6 text-purple-500" />}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{activity.entity.name}</p>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      {t.viewDetails || "View details"}
                    </Button>
                  </div>
                </div>
              )}

              {activity.user && (
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">{activity.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{activity.user.name}</span>
                </div>
              )}
            </div>
          </div>

          {index < activities.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )
}

