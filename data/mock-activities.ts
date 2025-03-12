import type { Activity } from "@/components/organisms/activities/activity-feed"

// Generate a timestamp within the last month
const getRandomTimestamp = () => {
  const now = new Date()
  const randomDaysAgo = Math.floor(Math.random() * 30)
  const randomHoursAgo = Math.floor(Math.random() * 24)
  const randomMinutesAgo = Math.floor(Math.random() * 60)

  now.setDate(now.getDate() - randomDaysAgo)
  now.setHours(now.getHours() - randomHoursAgo)
  now.setMinutes(now.getMinutes() - randomMinutesAgo)

  return now.toISOString()
}

// Sort activities by timestamp (newest first)
const sortByTimestamp = (a: Activity, b: Activity) => {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
}

export const mockActivities: Activity[] = [
  {
    id: "act1",
    type: "property",
    action: "viewed",
    title: "Property Viewed",
    description: "You viewed a property in Austin, TX",
    timestamp: getRandomTimestamp(),
    entity: {
      id: "prop1",
      name: "123 Main St, Austin, TX",
      image: "/placeholder.svg?height=80&width=120",
    },
  },
  {
    id: "act2",
    type: "property",
    action: "favorited",
    title: "Property Favorited",
    description: "You added a property to your favorites",
    timestamp: getRandomTimestamp(),
    entity: {
      id: "prop2",
      name: "456 Oak Ave, Austin, TX",
      image: "/placeholder.svg?height=80&width=120",
    },
  },
  {
    id: "act3",
    type: "message",
    action: "sent",
    title: "Message Sent",
    description: "You sent a message to John Contractor",
    timestamp: getRandomTimestamp(),
    status: "completed",
    user: {
      name: "John Contractor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "act4",
    type: "document",
    action: "uploaded",
    title: "Document Uploaded",
    description: "You uploaded a property inspection report",
    timestamp: getRandomTimestamp(),
    status: "completed",
    entity: {
      id: "doc1",
      name: "Property Inspection Report.pdf",
    },
  },
  {
    id: "act5",
    type: "investment",
    action: "created",
    title: "Investment Created",
    description: "You created a new investment opportunity",
    timestamp: getRandomTimestamp(),
    status: "pending",
    entity: {
      id: "inv1",
      name: "Pine Street Renovation Project",
    },
  },
  {
    id: "act6",
    type: "contractor",
    action: "contacted",
    title: "Contractor Contacted",
    description: "You requested a quote from a contractor",
    timestamp: getRandomTimestamp(),
    status: "pending",
    user: {
      name: "ABC Renovations",
    },
  },
  {
    id: "act7",
    type: "lender",
    action: "applied",
    title: "Loan Application",
    description: "You applied for financing with First Capital Bank",
    timestamp: getRandomTimestamp(),
    status: "pending",
    entity: {
      id: "lender1",
      name: "First Capital Bank",
    },
  },
  {
    id: "act8",
    type: "document",
    action: "downloaded",
    title: "Document Downloaded",
    description: "You downloaded a loan agreement document",
    timestamp: getRandomTimestamp(),
    entity: {
      id: "doc2",
      name: "Loan Agreement.pdf",
    },
  },
  {
    id: "act9",
    type: "property",
    action: "analyzed",
    title: "Property Analysis",
    description: "You ran an investment analysis on a property",
    timestamp: getRandomTimestamp(),
    status: "completed",
    entity: {
      id: "prop3",
      name: "789 Pine Ln, Austin, TX",
      image: "/placeholder.svg?height=80&width=120",
    },
  },
  {
    id: "act10",
    type: "message",
    action: "received",
    title: "Message Received",
    description: "You received a message from Sarah Lender",
    timestamp: getRandomTimestamp(),
    user: {
      name: "Sarah Lender",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "act11",
    type: "investment",
    action: "updated",
    title: "Investment Updated",
    description: "You updated the budget for your investment project",
    timestamp: getRandomTimestamp(),
    entity: {
      id: "inv2",
      name: "Oak Avenue Flip Project",
    },
  },
  {
    id: "act12",
    type: "document",
    action: "signed",
    title: "Document Signed",
    description: "You signed a purchase agreement",
    timestamp: getRandomTimestamp(),
    status: "completed",
    entity: {
      id: "doc3",
      name: "Purchase Agreement.pdf",
    },
  },
].sort(sortByTimestamp)

