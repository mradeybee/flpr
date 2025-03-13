"use client"

import type React from "react"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Share2,
  Bookmark,
  MessageSquare,
  Phone,
  Mail,
  Camera,
  Map,
  Download,
  Printer,
  Brain,
  CheckCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/templates/DashboardLayout"
import { useTranslations } from "@/hooks/use-translations"
import { useAuth } from "@/contexts/auth-context"

// Update the propertyData object with real Pexels images
const propertyData = {
  id: 1,
  title: "Fixer-Upper Ranch Style Home",
  address: "123 Renovation Ave, Austin, TX 78701",
  price: 275000,
  sqft: 1850,
  beds: 3,
  baths: 2,
  images: [
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
    "https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg",
    "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg",
  ],
  potentialValue: 425000,
  estimatedRepair: 75000,
  status: "For Sale",
  description:
    "This charming ranch-style home offers tremendous potential for investors or DIY enthusiasts. Built in 1972, the property features a spacious layout with good bones but is in need of comprehensive updates. The home sits on a generous 0.25-acre lot in a desirable neighborhood with rising property values. Original hardwood floors throughout most of the home can be refinished. The kitchen and bathrooms require complete renovation. Roof was replaced 10 years ago and may need repairs. HVAC system is functional but outdated. Perfect opportunity to add significant value through strategic renovations.",
  yearBuilt: 1972,
  lotSize: "0.25 acres",
  propertyType: "Single Family",
  zoning: "Residential",
  neighborhood: "Oakwood Heights",
  schoolDistrict: "Austin ISD",
  taxAssessment: 230000,
  annualTaxes: 4800,
  floodZone: "Zone X (Minimal Risk)",
  utilities: "Public Water, Public Sewer, Natural Gas",
  holdingCosts: 12000,
  closingCosts: 8500,
  cashOnCashReturn: "18%",
  capRate: "7.2%",
  renovationNeeds: [
    { category: "Exterior", priority: "Medium", cost: 12000, notes: "Siding repairs, paint, landscaping" },
    { category: "Kitchen", priority: "High", cost: 25000, notes: "Complete remodel, new appliances" },
    { category: "Bathrooms", priority: "High", cost: 18000, notes: "Complete remodel of both bathrooms" },
    { category: "Flooring", priority: "Medium", cost: 8500, notes: "Refinish hardwoods, new tile in wet areas" },
    { category: "Electrical", priority: "Medium", cost: 6500, notes: "Update panel, add outlets, new fixtures" },
    { category: "Plumbing", priority: "Low", cost: 3500, notes: "Replace outdated fixtures, check pipes" },
    { category: "HVAC", priority: "Medium", cost: 8000, notes: "Replace aging system" },
    { category: "Paint", priority: "Low", cost: 4500, notes: "Interior paint throughout" },
    { category: "Windows", priority: "Low", cost: 6000, notes: "Replace several damaged windows" },
  ],
  comparables: [
    {
      address: "145 Renovation Ave",
      status: "Sold",
      price: 410000,
      sqft: 1920,
      beds: 3,
      baths: 2,
      daysOnMarket: 28,
      distance: "0.2 miles",
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    },
    {
      address: "78 Oakwood Dr",
      status: "Sold",
      price: 395000,
      sqft: 1780,
      beds: 3,
      baths: 2,
      daysOnMarket: 35,
      distance: "0.4 miles",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
    },
    {
      address: "221 Highland St",
      status: "Active",
      price: 450000,
      sqft: 2100,
      beds: 4,
      baths: 2.5,
      daysOnMarket: 14,
      distance: "0.6 miles",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
    },
  ],
  listedOn: "2023-11-15",
  lastUpdated: "2023-12-01",
  mls: "AUS12345",
  walkScore: 72,
  transitScore: 58,
  bikeScore: 65,
  agent: {
    name: "Sarah Johnson",
    phone: "(512) 555-1234",
    email: "sarah@flpr.com",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
  },
  features: {
    appliances: ["Dishwasher", "Range/Oven"],
    cooling: "Central Air",
    heating: "Forced Air",
    garage: "2-Car Attached",
    basement: "None",
    outdoor: ["Patio", "Fenced Yard"],
    security: "Pre-wired",
  },
  priceHistory: [
    { date: "2023-11-15", event: "Listed", price: 275000, source: "MLS" },
    { date: "2023-10-05", event: "Sold", price: 180000, source: "County Records" },
    { date: "2005-06-12", event: "Sold", price: 145000, source: "County Records" },
  ],
}

export default function PropertyDetailsPage() {
  const params = useParams()
  const propertyId = params.id
  const t = useTranslations()
  const [activeTab, setActiveTab] = useState("overview")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const { user } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated or not investor/homeowner
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.userType !== "investor" && user.userType !== "homeowner") {
      router.push("/dashboard")
    }
  }, [user, router])

  // Calculate total renovation cost
  const totalRenovationCost = propertyData.renovationNeeds.reduce((total, item) => total + item.cost, 0)

  // Calculate ROI
  const totalInvestment =
    propertyData.price + totalRenovationCost + propertyData.holdingCosts + propertyData.closingCosts
  const potentialProfit = propertyData.potentialValue - totalInvestment
  const roi = ((potentialProfit / totalInvestment) * 100).toFixed(1)

  // Handle AI analysis
  const startAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis with progress updates
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }
    }, 200)
  }

  if (!user || (user.userType !== "investor" && user.userType !== "homeowner")) return null

  return (
    <DashboardLayout>
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6">
          <Link
            href="/properties"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToProperties}
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{propertyData.title}</h1>
              <div className="flex items-center mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{propertyData.address}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Badge className="mr-2">{propertyData.status}</Badge>
              <span className="text-2xl font-bold">${propertyData.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          <div className="space-y-6">
            {/* Property Images */}
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={propertyData.images[activeImageIndex] || "/placeholder.svg"}
                  alt={propertyData.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {propertyData.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-20 w-32 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                      activeImageIndex === index ? "border-flipr-orange" : "border-transparent"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                <TabsTrigger value="renovation">{t.renovationPlan}</TabsTrigger>
                <TabsTrigger value="comparables">{t.comparables}</TabsTrigger>
                <TabsTrigger value="contact">{t.contactSeller}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.propertyDescription}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{propertyData.description}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.keyDetails}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                        <div>
                          <dt className="text-muted-foreground">{t.yearBuilt}</dt>
                          <dd className="font-medium">{propertyData.yearBuilt}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.lotSize}</dt>
                          <dd className="font-medium">{propertyData.lotSize}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.squareFeet}</dt>
                          <dd className="font-medium">
                            {propertyData.sqft} {t.sqft}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.propertyType}</dt>
                          <dd className="font-medium">{propertyData.propertyType}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.zoning}</dt>
                          <dd className="font-medium">{propertyData.zoning}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.neighborhood}</dt>
                          <dd className="font-medium">{propertyData.neighborhood}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.schoolDistrict}</dt>
                          <dd className="font-medium">{propertyData.schoolDistrict}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.taxAssessment}</dt>
                          <dd className="font-medium">${propertyData.taxAssessment.toLocaleString()}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.annualTaxes}</dt>
                          <dd className="font-medium">${propertyData.annualTaxes.toLocaleString()}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">{t.floodZone}</dt>
                          <dd className="font-medium">{propertyData.floodZone}</dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-muted-foreground">{t.utilities}</dt>
                          <dd className="font-medium">{propertyData.utilities}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t.investmentMetrics}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.purchasePrice}</dt>
                          <dd className="font-medium">${propertyData.price.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.estimatedRepairCost}</dt>
                          <dd className="font-medium">${totalRenovationCost.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.holdingCosts}</dt>
                          <dd className="font-medium">${propertyData.holdingCosts.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.closingCosts}</dt>
                          <dd className="font-medium">${propertyData.closingCosts.toLocaleString()}</dd>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.totalInvestment}</dt>
                          <dd className="font-medium">${totalInvestment.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.afterRepairValue}</dt>
                          <dd className="font-medium">${propertyData.potentialValue.toLocaleString()}</dd>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.potentialProfit}</dt>
                          <dd className="font-medium text-green-600">${potentialProfit.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.estimatedROI}</dt>
                          <dd className="font-medium text-green-600">{roi}%</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.cashOnCashReturn}</dt>
                          <dd className="font-medium">{propertyData.cashOnCashReturn}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t.capRate}</dt>
                          <dd className="font-medium">{propertyData.capRate}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.propertyFeatures}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(propertyData.features).map(([category, value]) => (
                        <div key={category}>
                          <h4 className="font-medium mb-2 capitalize">{category}</h4>
                          {Array.isArray(value) ? (
                            <ul className="space-y-1">
                              {value.map((item, index) => (
                                <li key={index} className="text-sm">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm">{value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Property History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Date</th>
                          <th className="text-left py-2 font-medium">Event</th>
                          <th className="text-left py-2 font-medium">Price</th>
                          <th className="text-left py-2 font-medium">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {propertyData.priceHistory.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{item.date}</td>
                            <td className="py-2">{item.event}</td>
                            <td className="py-2">${item.price.toLocaleString()}</td>
                            <td className="py-2">{item.source}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="renovation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.renovationNeeds}</CardTitle>
                    <CardDescription>
                      {t.estimatedCost}: ${totalRenovationCost.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Category</th>
                          <th className="text-left py-2 font-medium">Priority</th>
                          <th className="text-left py-2 font-medium">Estimated Cost</th>
                          <th className="text-left py-2 font-medium">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {propertyData.renovationNeeds.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{item.category}</td>
                            <td className="py-2">
                              <Badge
                                variant={
                                  item.priority === "High"
                                    ? "destructive"
                                    : item.priority === "Medium"
                                      ? "default"
                                      : "outline"
                                }
                              >
                                {item.priority}
                              </Badge>
                            </td>
                            <td className="py-2">${item.cost.toLocaleString()}</td>
                            <td className="py-2">{item.notes}</td>
                          </tr>
                        ))}
                        <tr className="font-medium">
                          <td className="py-2">{t.total}</td>
                          <td className="py-2"></td>
                          <td className="py-2">${totalRenovationCost.toLocaleString()}</td>
                          <td className="py-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      <Button variant="outline" className="mr-2">
                        <Download className="mr-2 h-4 w-4" />
                        {t.downloadPDF}
                      </Button>
                      <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        {t.printDetails}
                      </Button>
                    </div>
                    {user.userType === "investor" && (
                      <Button
                        className="bg-flipr-orange hover:bg-flipr-orange/90"
                        onClick={startAnalysis}
                        disabled={isAnalyzing || analysisComplete}
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        {isAnalyzing ? "Analyzing..." : analysisComplete ? "Analysis Complete" : "AI Analysis"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                {/* AI Analysis Section */}
                {(isAnalyzing || analysisComplete) && user.userType === "investor" && (
                  <>
                    {isAnalyzing ? (
                      <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                        <CardHeader>
                          <CardTitle>{t.analyzingYourProject}</CardTitle>
                          <CardDescription>{t.aiProcessingDetails}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{t.analysisInProgress}</span>
                              <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="animate-pulse">{t.evaluatingProperty}</p>
                            <p
                              className={`transition-opacity duration-500 ${progress > 20 ? "opacity-100" : "opacity-0"}`}
                            >
                              {t.calculatingMaterials}
                            </p>
                            <p
                              className={`transition-opacity duration-500 ${progress > 40 ? "opacity-100" : "opacity-0"}`}
                            >
                              {t.estimatingLabor}
                            </p>
                            <p
                              className={`transition-opacity duration-500 ${progress > 60 ? "opacity-100" : "opacity-0"}`}
                            >
                              {t.generatingTimeline}
                            </p>
                            <p
                              className={`transition-opacity duration-500 ${progress > 80 ? "opacity-100" : "opacity-0"}`}
                            >
                              {t.finalizingAnalysis}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-8">
                        <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                          <CardHeader>
                            <CardTitle>{t.projectAnalysisResults}</CardTitle>
                            <CardDescription>{t.aiGeneratedEstimates}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-6 md:grid-cols-3">
                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">{t.totalCostEstimate}</h3>
                                <div className="flex items-end gap-2">
                                  <span className="text-3xl font-bold">$78,500</span>
                                  <span className="text-sm text-muted-foreground">{t.to}</span>
                                  <span className="text-3xl font-bold">$92,300</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{t.basedOnMarketRates}</p>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">{t.estimatedTimeline}</h3>
                                <div className="flex items-end gap-2">
                                  <span className="text-3xl font-bold">12</span>
                                  <span className="text-sm text-muted-foreground">{t.to}</span>
                                  <span className="text-3xl font-bold">16</span>
                                  <span className="text-sm text-muted-foreground">{t.weeks}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{t.includingPlanning}</p>
                              </div>

                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">{t.potentialROI}</h3>
                                <div className="flex items-end gap-2">
                                  <span className="text-3xl font-bold text-green-600">24%</span>
                                  <span className="text-sm text-muted-foreground">{t.estimated}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{t.basedOnComparableProperties}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="grid gap-6 md:grid-cols-2">
                          <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                            <CardHeader>
                              <CardTitle className="text-xl">{t.costBreakdown}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{t.materials}</span>
                                    <span>$32,400 - $38,700</span>
                                  </div>
                                  <Progress value={42} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{t.labor}</span>
                                    <span>$36,800 - $42,500</span>
                                  </div>
                                  <Progress value={46} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{t.permitsAndFees}</span>
                                    <span>$3,200 - $4,100</span>
                                  </div>
                                  <Progress value={4} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{t.contingency}</span>
                                    <span>$6,100 - $7,000</span>
                                  </div>
                                  <Progress value={8} className="h-2" />
                                </div>
                              </div>

                              <div className="mt-6 space-y-4">
                                <h4 className="font-medium">{t.topCostItems}</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex justify-between">
                                    <span>{t.kitchenRenovation}</span>
                                    <span className="font-medium">$24,500 - $28,900</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>{t.bathroomRemodel}</span>
                                    <span className="font-medium">$18,200 - $21,500</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>{t.flooringReplacement}</span>
                                    <span className="font-medium">$12,800 - $15,200</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>{t.electricalUpdates}</span>
                                    <span className="font-medium">$8,500 - $10,200</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>{t.plumbingWork}</span>
                                    <span className="font-medium">$7,200 - $8,900</span>
                                  </li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                            <CardHeader>
                              <CardTitle className="text-xl">{t.timelineAndRecommendations}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-medium mb-2">{t.projectTimeline}</h4>
                                  <ul className="space-y-4 text-sm">
                                    <li className="flex gap-3">
                                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flipr-orange/10">
                                        <span className="h-2 w-2 rounded-full bg-flipr-orange" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{t.planningAndDesign}</p>
                                        <p className="text-muted-foreground">2-3 {t.weeks}</p>
                                      </div>
                                    </li>
                                    <li className="flex gap-3">
                                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flipr-orange/10">
                                        <span className="h-2 w-2 rounded-full bg-flipr-orange" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{t.permitsAndApprovals}</p>
                                        <p className="text-muted-foreground">1-2 {t.weeks}</p>
                                      </div>
                                    </li>
                                    <li className="flex gap-3">
                                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flipr-orange/10">
                                        <span className="h-2 w-2 rounded-full bg-flipr-orange" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{t.demolitionAndPrep}</p>
                                        <p className="text-muted-foreground">1-2 {t.weeks}</p>
                                      </div>
                                    </li>
                                    <li className="flex gap-3">
                                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flipr-orange/10">
                                        <span className="h-2 w-2 rounded-full bg-flipr-orange" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{t.roughInWork}</p>
                                        <p className="text-muted-foreground">2-3 {t.weeks}</p>
                                      </div>
                                    </li>
                                    <li className="flex gap-3">
                                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flipr-orange/10">
                                        <span className="h-2 w-2 rounded-full bg-flipr-orange" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{t.finishesAndInstallation}</p>
                                        <p className="text-muted-foreground">4-5 {t.weeks}</p>
                                      </div>
                                    </li>
                                    <li className="flex gap-3">
                                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flipr-orange/10">
                                        <span className="h-2 w-2 rounded-full bg-flipr-orange" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{t.finalInspections}</p>
                                        <p className="text-muted-foreground">1 {t.week}</p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">{t.aiRecommendations}</h4>
                                  <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                      <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      </div>
                                      <p>{t.estimatedTimeline}: 12 {t.weeks}</p>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      </div>
                                      <p>{t.basedOnMarketRates}</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                          <Button
                            onClick={() => {
                              setAnalysisComplete(false)
                              setProgress(0)
                            }}
                            variant="outline"
                            className="border-flipr-orange text-flipr-orange hover:bg-flipr-orange/10"
                          >
                            {t.modifyProjectDetails}
                          </Button>

                          <div className="flex gap-4">
                            <Button variant="outline">{t.downloadPDFReport}</Button>
                            <Button className="bg-flipr-orange hover:bg-flipr-orange/90">{t.findContractors}</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="comparables" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.similarProperties}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {propertyData.comparables.map((comp, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 border-b pb-4">
                          <div className="md:w-48 flex-shrink-0">
                            <Image
                              src={comp.image || "/placeholder.svg"}
                              alt={comp.address}
                              width={200}
                              height={150}
                              className="rounded-md object-cover w-full h-32"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div>
                                <h4 className="font-medium">{comp.address}</h4>
                                <Badge variant={comp.status === "Sold" ? "secondary" : "default"} className="mt-1">
                                  {comp.status}
                                </Badge>
                              </div>
                              <div className="text-lg font-bold">${comp.price.toLocaleString()}</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-muted-foreground">{t.squareFeet}</p>
                                <p>
                                  {comp.sqft} {t.sqft}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  {t.beds}/{t.baths}
                                </p>
                                <p>
                                  {comp.beds}/{comp.baths}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t.daysOnMarket}</p>
                                <p>
                                  {comp.daysOnMarket} {t.days}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t.distance}</p>
                                <p>{comp.distance}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.contactSellerAbout}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.yourName}</Label>
                          <Input id="name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.yourEmail}</Label>
                          <Input id="email" type="email" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.phoneNumber}</Label>
                        <Input id="phone" type="tel" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t.message}</Label>
                        <Textarea id="message" rows={5} defaultValue={t.iAmInterested} />
                      </div>
                      <Button type="submit" className="w-full">
                        {t.send}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.propertyStatus}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.listedOn}</span>
                  <span>{propertyData.listedOn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.lastUpdated}</span>
                  <span>{propertyData.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.mls}</span>
                  <span>{propertyData.mls}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {t.contactSeller}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {t.makeOffer}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Bookmark className="mr-2 h-4 w-4" />
                      {t.saveProperty}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      {t.shareProperty}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.contactAgent}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={propertyData.agent.image || "/placeholder.svg"}
                    alt={propertyData.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-medium">{propertyData.agent.name}</h4>
                    <p className="text-sm text-muted-foreground">Flipr Agent</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{propertyData.agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{propertyData.agent.email}</span>
                  </div>
                </div>
                <Button className="w-full">{t.contactAgentNow}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.nearbyAmenities}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold">{propertyData.walkScore}</div>
                    <p className="text-xs text-muted-foreground">{t.walkScore}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{propertyData.transitScore}</div>
                    <p className="text-xs text-muted-foreground">{t.transitScore}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{propertyData.bikeScore}</div>
                    <p className="text-xs text-muted-foreground">{t.bikeScore}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Map className="mr-2 h-4 w-4" />
                    {t.viewOnMap}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    {t.streetView}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.similarPropertiesNearby}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {propertyData.comparables.slice(0, 2).map((comp, index) => (
                  <div key={index} className="flex gap-3">
                    <Image
                      src={comp.image || "/placeholder.svg"}
                      alt={comp.address}
                      width={80}
                      height={60}
                      className="rounded-md object-cover w-20 h-16"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{comp.address}</p>
                      <p className="text-sm">${comp.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {comp.beds} {t.beds} • {comp.baths} {t.baths} • {comp.sqft} {t.sqft}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="w-full p-0">
                  {t.viewMore}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Helper component for the check icon in recommendations
function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

