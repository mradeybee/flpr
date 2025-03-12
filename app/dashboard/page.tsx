"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/atoms/Badge"
import { Progress } from "@/components/ui/progress"
import { Home, DollarSign, Hammer, BarChart3, PlusCircle, Clock, CheckCircle2 } from "lucide-react"
import { DashboardLayout } from "@/components/templates/DashboardLayout"
import { useTranslations } from "@/hooks/use-translations"
import { useAuth } from "@/contexts/auth-context"
import Activities from "@/components/organisms/activities"

// Mock data for different user types
const investorProperties = [
  {
    id: 1,
    title: "123 Renovation Ave",
    status: "In Progress",
    progress: 75,
    purchase: 275000,
    arv: 425000,
  },
  {
    id: 2,
    title: "456 Opportunity St",
    status: "In Progress",
    progress: 40,
    purchase: 320000,
    arv: 520000,
  },
  {
    id: 3,
    title: "789 Flipper Rd",
    status: "Planning",
    progress: 5,
    purchase: 230000,
    arv: 350000,
  },
]

const homeownerProperties = [
  {
    id: 1,
    title: "123 My Home Ave",
    status: "Listed",
    views: 45,
    inquiries: 3,
    price: 275000,
  },
  {
    id: 2,
    title: "456 Family St",
    status: "Under Contract",
    views: 120,
    inquiries: 8,
    price: 320000,
  },
]

const contractorRequests = [
  {
    id: 1,
    property: "123 Renovation Ave",
    investor: "John Smith",
    type: "Kitchen Remodel",
    budget: 25000,
    deadline: "2024-06-15",
    status: "Pending",
  },
  {
    id: 2,
    property: "456 Opportunity St",
    investor: "Sarah Johnson",
    type: "Bathroom Renovation",
    budget: 18000,
    deadline: "2024-05-30",
    status: "Accepted",
  },
  {
    id: 3,
    property: "789 Flipper Rd",
    investor: "Michael Brown",
    type: "Full House Renovation",
    budget: 85000,
    deadline: "2024-07-20",
    status: "Pending",
  },
]

const lenderRequests = [
  {
    id: 1,
    property: "123 Renovation Ave",
    investor: "John Smith",
    amount: 220000,
    term: "12 months",
    ltv: "75%",
    status: "Pending",
  },
  {
    id: 2,
    property: "456 Opportunity St",
    investor: "Sarah Johnson",
    amount: 280000,
    term: "18 months",
    ltv: "70%",
    status: "Approved",
  },
  {
    id: 3,
    property: "789 Flipper Rd",
    investor: "Michael Brown",
    amount: 195000,
    term: "12 months",
    ltv: "80%",
    status: "Pending",
  },
]

export default function DashboardPage() {
  const t = useTranslations()
  const { user } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user.firstName} {user.lastName}
        </h1>
        <p className="text-muted-foreground">
          {user.userType === "homeowner" && "Manage your property listings and inquiries"}
          {user.userType === "investor" && "Track your investment properties and projects"}
          {user.userType === "contractor" && "Manage your renovation requests and projects"}
          {user.userType === "lender" && "Review funding requests and manage loans"}
        </p>
      </div>

      <Tabs defaultValue="overview" className="h-full space-y-6">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            <TabsTrigger value="activity">{t.activity}</TabsTrigger>
          </TabsList>
          <div className="ml-auto">
            {user.userType === "homeowner" && (
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            )}
            {user.userType === "investor" && (
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t.addProperty}
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Homeowner Dashboard */}
          {user.userType === "homeowner" && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Listed Properties</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{homeownerProperties.length}</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">165</div>
                    <p className="text-xs text-muted-foreground">+22% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">11</div>
                    <p className="text-xs text-muted-foreground">+3 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Offers</CardTitle>
                    <Hammer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {homeownerProperties.map((property) => (
                      <div key={property.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{property.title}</h3>
                            <Badge>{property.status}</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">${property.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>Views: {property.views}</div>
                          <div>Inquiries: {property.inquiries}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Properties
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {/* Investor Dashboard */}
          {user.userType === "investor" && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.activeProjects}</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.totalInvestment}</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$825,000</div>
                    <p className="text-xs text-muted-foreground">+$225,000 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.projectedProfit}</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$215,000</div>
                    <p className="text-xs text-muted-foreground">+$65,000 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.activeContractors}</CardTitle>
                    <Hammer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {investorProperties.map((property) => (
                      <div key={property.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{property.title}</h3>
                            <Badge>{property.status}</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{property.progress}% Complete</span>
                        </div>
                        <Progress value={property.progress} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>
                            {t.purchaseLabel} ${property.purchase.toLocaleString()}
                          </div>
                          <div>
                            {t.arvLabel} ${property.arv.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Projects
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {/* Contractor Dashboard */}
          {user.userType === "contractor" && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Hammer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+3 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$125,000</div>
                    <p className="text-xs text-muted-foreground">+$28,000 from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Renovation Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contractorRequests.map((request) => (
                      <div key={request.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{request.property}</h3>
                            <Badge variant={request.status === "Accepted" ? "secondary" : "default"}>
                              {request.status}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">${request.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>Type: {request.type}</div>
                          <div>Deadline: {request.deadline}</div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>Investor: {request.investor}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {/* Lender Dashboard */}
          {user.userType === "lender" && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1.2M</div>
                    <p className="text-xs text-muted-foreground">+$280K from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Interest Income</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$95,000</div>
                    <p className="text-xs text-muted-foreground">+$12,000 from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Funding Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {lenderRequests.map((request) => (
                      <div key={request.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{request.property}</h3>
                            <Badge variant={request.status === "Approved" ? "secondary" : "default"}>
                              {request.status}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">${request.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>Term: {request.term}</div>
                          <div>LTV: {request.ltv}</div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>Investor: {request.investor}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
        

       <Activities />
       
          
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

