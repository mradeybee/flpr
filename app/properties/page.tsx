"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Ruler, BedDouble, Bath } from "lucide-react"
import { DashboardLayout } from "@/components/templates/DashboardLayout"
import { useTranslations } from "@/hooks/use-translations"
import { useAuth } from "@/contexts/auth-context"

// Update the properties array with real Pexels images
const properties = [
  {
    id: 1,
    title: "Fixer-Upper Ranch Style Home",
    address: "123 Renovation Ave, Austin, TX 78701",
    price: 275000,
    sqft: 1850,
    beds: 3,
    baths: 2,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    potentialValue: 425000,
    estimatedRepair: 75000,
    status: "For Sale",
  },
  {
    id: 2,
    title: "Distressed Victorian with Potential",
    address: "456 Opportunity St, Dallas, TX 75201",
    price: 320000,
    sqft: 2200,
    beds: 4,
    baths: 2.5,
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    potentialValue: 520000,
    estimatedRepair: 110000,
    status: "For Sale",
  },
  {
    id: 3,
    title: "Mid-Century Modern Needs TLC",
    address: "789 Flipper Rd, Houston, TX 77002",
    price: 230000,
    sqft: 1650,
    beds: 3,
    baths: 2,
    image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
    potentialValue: 350000,
    estimatedRepair: 60000,
    status: "Under Contract",
  },
  {
    id: 4,
    title: "Outdated Craftsman with Good Bones",
    address: "101 Rehab Lane, San Antonio, TX 78205",
    price: 195000,
    sqft: 1400,
    beds: 2,
    baths: 1,
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    potentialValue: 310000,
    estimatedRepair: 55000,
    status: "For Sale",
  },
  {
    id: 5,
    title: "Neglected Colonial Revival",
    address: "202 Investor Blvd, Fort Worth, TX 76102",
    price: 350000,
    sqft: 2600,
    beds: 4,
    baths: 3,
    image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
    potentialValue: 575000,
    estimatedRepair: 130000,
    status: "For Sale",
  },
  {
    id: 6,
    title: "Abandoned Bungalow in Historic District",
    address: "303 Profit Way, El Paso, TX 79901",
    price: 180000,
    sqft: 1200,
    beds: 2,
    baths: 1,
    image: "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg",
    potentialValue: 285000,
    estimatedRepair: 65000,
    status: "For Sale",
  },
]

export default function PropertiesPage() {
  const t = useTranslations()
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

  if (!user || (user.userType !== "investor" && user.userType !== "homeowner")) return null

  return (
    <DashboardLayout>
      <section className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">{t.findYourNextFlip}</h1>
            <p className="text-muted-foreground">{t.browseFlipDesc}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            {/* Filters */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>{t.filters}</CardTitle>
                <CardDescription>{t.narrowSearch}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City, State, or ZIP" className="pl-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="pt-2">
                    <Slider defaultValue={[100000, 500000]} min={50000} max={1000000} step={10000} />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">$100,000</span>
                      <span className="text-sm text-muted-foreground">$500,000</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="single">Single Family</SelectItem>
                      <SelectItem value="multi">Multi-Family</SelectItem>
                      <SelectItem value="condo">Condo/Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Beds</label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Baths</label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Potential ROI</label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="15">15%+</SelectItem>
                      <SelectItem value="20">20%+</SelectItem>
                      <SelectItem value="25">25%+</SelectItem>
                      <SelectItem value="30">30%+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>

            {/* Property Listings */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {t.showing} {properties.length} {t.properties.toLocaleLowerCase()}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{t.sortBy}</span>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t.sortBy} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t.newest}</SelectItem>
                      <SelectItem value="price-low">{t.priceLowToHigh}</SelectItem>
                      <SelectItem value="price-high">{t.priceHighToLow}</SelectItem>
                      <SelectItem value="roi">{t.highestROI}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={400}
                        height={300}
                        className="w-full h-[200px] object-cover"
                      />
                      <Badge
                        className="absolute top-2 right-2"
                        variant={property.status === "For Sale" ? "default" : "secondary"}
                      >
                        {property.status}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{property.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {property.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-bold">${property.price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Ruler className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{property.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <BedDouble className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>
                            {property.beds} {t.beds}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>
                            {property.baths} {t.baths}
                          </span>
                        </div>
                      </div>
                      <div className="border-t pt-4 mt-2">
                        <h4 className="text-sm font-medium mb-2">{t.investmentAnalysis}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">{t.afterRepairValue}</p>
                            <p className="font-medium">${property.potentialValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">{t.estRepairCost}</p>
                            <p className="font-medium">${property.estimatedRepair.toLocaleString()}</p>
                          </div>
                          <div className="col-span-2 mt-2">
                            <p className="text-muted-foreground">{t.potentialProfit}</p>
                            <p className="font-medium text-green-600">
                              ${(property.potentialValue - property.price - property.estimatedRepair).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link href={`/properties/${property.id}`}>{t.viewDetails}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

