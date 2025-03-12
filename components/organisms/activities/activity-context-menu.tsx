"use client"

import { useTranslations } from "@/hooks/use-translations"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, Trash, Archive, Share, Copy, AlertCircle } from "lucide-react"

interface ActivityContextMenuProps {
  activityId: string
  activityType: string
}

export function ActivityContextMenu({ activityId, activityType }: ActivityContextMenuProps) {
  const t = useTranslations()

  const handleView = () => {
    console.log(`View activity ${activityId}`)
  }

  const handleDelete = () => {
    console.log(`Delete activity ${activityId}`)
  }

  const handleArchive = () => {
    console.log(`Archive activity ${activityId}`)
  }

  const handleShare = () => {
    console.log(`Share activity ${activityId}`)
  }

  const handleCopy = () => {
    console.log(`Copy activity ${activityId}`)
  }

  const handleReport = () => {
    console.log(`Report activity ${activityId}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">{t.openMenu || "Open menu"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleView}>
          <Eye className="mr-2 h-4 w-4" />
          <span>{t.viewDetails || "View details"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          <span>{t.copyLink || "Copy link"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          <span>{t.share || "Share"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          <span>{t.archive || "Archive"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          <span>{t.delete || "Delete"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleReport} className="text-destructive">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span>{t.report || "Report"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

