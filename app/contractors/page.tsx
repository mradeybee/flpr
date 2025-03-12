"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Hammer, Clock, Star, CheckCircle, Calendar } from "lucide-react"
import { DashboardLayout } from "@/components/templates/DashboardLayout"

import { useTranslations } from "@/hooks/use-translations"

// Mock data for contractors
const contractors = [
  {
    id: 1,
    name: "Elite Renovations",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Austin, TX",
    specialty: "General Contractor",
    services: ["Full Renovations", "Kitchen Remodels", "Bathroom Remodels", "Additions"],
    availability: "Available Now",
    rating: 4.8,
    reviews: 124,
    verified: true,
    featured: true,
    completedProjects: 87,
    yearsExperience: 12,
  },
  {
    id: 2,
    name: "Modern Plumbing Solutions",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Dallas, TX",
    specialty: "Plumbing",
    services: ["Plumbing Repairs", "Pipe Replacement", "Fixture Installation", "Water Heaters"],
    availability: "Available in 2 weeks",
    rating: 4.6,
    reviews: 98,
    verified: true,
    featured: false,
    completedProjects: 156,
    yearsExperience: 8,
  },
  {
    id: 3,
    name: "Precision Electric",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Houston, TX",
    specialty: "Electrical",
    services: ["Electrical Repairs", "Panel Upgrades", "Lighting Installation", "Rewiring"],
    availability: "Available Now",
    rating: 4.7,
    reviews: 112,
    verified: true,
    featured: true,
    completedProjects: 134,
    yearsExperience: 15,
  },
  {
    id: 4,
    name: "Texas Roofing Experts",
    logo: "/placeholder.svg?height=80&width=80",
    location: "San Antonio, TX",
    specialty: "Roofing",
    services: ["Roof Replacement", "Roof Repairs", "Gutter Installation", "Inspections"],
    availability: "Available in 1 week",
    rating: 4.5,
    reviews: 89,
    verified: true,
    featured: false,
    completedProjects: 210,
    yearsExperience: 18,
  },
  {
    id: 5,
    name: "Lone Star HVAC",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Fort Worth, TX",
    specialty: "HVAC",
    services: ["AC Installation", "Heating Repairs", "Duct Cleaning", "System Maintenance"],
    availability: "Available in 3 days",
    rating: 4.4,
    reviews: 76,
    verified: true,
    featured: false,
    completedProjects: 192,
    yearsExperience: 10,
  },
  {
    id: 6,
    name: "Premium Painting Pros",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Austin, TX",
    specialty: "Painting",
    services: ["Interior Painting", "Exterior Painting", "Cabinet Refinishing", "Drywall Repair"],
    availability: "Available Now",
    rating: 4.9,
    reviews: 145,
    verified: true,
    featured: true,
    completedProjects: 320,
    yearsExperience: 14,
  },
]

export default function ContractorsPage() {
  const t = useTranslations()

  return (
    <DashboardLayout>
      <section className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">{t.findContractors}</h1>
            <p className="text-muted-foreground">{t.connectWithProfessionals}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            {/* Filters */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Find the right contractor for your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search contractors..." className="pl-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="austin">Austin, TX</SelectItem>
                      <SelectItem value="dallas">Dallas, TX</SelectItem>
                      <SelectItem value="houston">Houston, TX</SelectItem>
                      <SelectItem value="sanantonio">San Antonio, TX</SelectItem>
                      <SelectItem value="fortworth">Fort Worth, TX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialty</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="general">General Contractor</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Availability</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Availability</SelectItem>
                      <SelectItem value="now">Available Now</SelectItem>
                      <SelectItem value="week">Available This Week</SelectItem>
                      <SelectItem value="month">Available This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>

            {/* Contractor Listings */}
            <div className="space-y-6">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All Contractors</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="available">Available Now</TabsTrigger>
                  </TabsList>
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="experience">Most Experience</SelectItem>
                      <SelectItem value="projects">Most Projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-6">
                    {contractors.map((contractor) => (
                      <Card key={contractor.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="flex items-center justify-center p-6 md:w-48 bg-muted">
                            <Image
                              src={contractor.logo || "/placeholder.svg"}
                              alt={contractor.name}
                              width={80}
                              height={80}
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-xl font-bold">{contractor.name}</h3>
                                  {contractor.verified && (
                                    <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      {t.verified}
                                    </Badge>
                                  )}
                                  {contractor.featured && <Badge variant="secondary">Featured</Badge>}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{contractor.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{contractor.rating}</span>
                                <span className="text-sm text-muted-foreground">({contractor.reviews} reviews)</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Hammer className="h-3.5 w-3.5" />
                                  <span>{t.specialty}</span>
                                </div>
                                <p className="font-medium">{contractor.specialty}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{t.experience}</span>
                                </div>
                                <p className="font-medium">
                                  {contractor.yearsExperience} {t.years}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                  <span>{t.completedProjects}</span>
                                </div>
                                <p className="font-medium">{contractor.completedProjects}</p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                <Hammer className="h-3.5 w-3.5" />
                                <span>{t.services}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {contractor.services.map((service, index) => (
                                  <Badge key={index} variant="outline">
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardFooter className="bg-muted/50 px-6 py-4">
                          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span
                                className={
                                  contractor.availability === "Available Now" ? "text-green-600 font-medium" : ""
                                }
                              >
                                {contractor.availability}
                              </span>
                            </div>
                            <div className="flex gap-4 ml-auto">
                              <Button variant="outline">{t.viewProfile}</Button>
                              <Button>{t.contact}</Button>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="featured" className="mt-6">
                  <div className="grid gap-6">
                    {contractors
                      .filter((contractor) => contractor.featured)
                      .map((contractor) => (
                        <Card key={contractor.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="flex items-center justify-center p-6 md:w-48 bg-muted">
                              <Image
                                src={contractor.logo || "/placeholder.svg"}
                                alt={contractor.name}
                                width={80}
                                height={80}
                                className="rounded-md"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold">{contractor.name}</h3>
                                    {contractor.verified && (
                                      <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {t.verified}
                                      </Badge>
                                    )}
                                    <Badge variant="secondary">Featured</Badge>
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{contractor.location}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{contractor.rating}</span>
                                  <span className="text-sm text-muted-foreground">({contractor.reviews} reviews)</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Hammer className="h-3.5 w-3.5" />
                                    <span>{t.specialty}</span>
                                  </div>
                                  <p className="font-medium">{contractor.specialty}</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{t.experience}</span>
                                  </div>
                                  <p className="font-medium">
                                    {contractor.yearsExperience} {t.years}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    <span>{t.completedProjects}</span>
                                  </div>
                                  <p className="font-medium">{contractor.completedProjects}</p>
                                </div>
                              </div>

                              <div className="mt-4">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                  <Hammer className="h-3.5 w-3.5" />
                                  <span>{t.services}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {contractor.services.map((service, index) => (
                                    <Badge key={index} variant="outline">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardFooter className="bg-muted/50 px-6 py-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span
                                  className={
                                    contractor.availability === "Available Now" ? "text-green-600 font-medium" : ""
                                  }
                                >
                                  {contractor.availability}
                                </span>
                              </div>
                              <div className="flex gap-4 ml-auto">
                                <Button variant="outline">{t.viewProfile}</Button>
                                <Button>{t.contact}</Button>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="available" className="mt-6">
                  <div className="grid gap-6">
                    {contractors
                      .filter((contractor) => contractor.availability === "Available Now")
                      .map((contractor) => (
                        <Card key={contractor.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="flex items-center justify-center p-6 md:w-48 bg-muted">
                              <Image
                                src={contractor.logo || "/placeholder.svg"}
                                alt={contractor.name}
                                width={80}
                                height={80}
                                className="rounded-md"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold">{contractor.name}</h3>
                                    {contractor.verified && (
                                      <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {t.verified}
                                      </Badge>
                                    )}
                                    {contractor.featured && <Badge variant="secondary">Featured</Badge>}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{contractor.location}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{contractor.rating}</span>
                                  <span className="text-sm text-muted-foreground">({contractor.reviews} reviews)</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Hammer className="h-3.5 w-3.5" />
                                    <span>{t.specialty}</span>
                                  </div>
                                  <p className="font-medium">{contractor.specialty}</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{t.experience}</span>
                                  </div>
                                  <p className="font-medium">
                                    {contractor.yearsExperience} {t.years}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    <span>{t.completedProjects}</span>
                                  </div>
                                  <p className="font-medium">{contractor.completedProjects}</p>
                                </div>
                              </div>

                              <div className="mt-4">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                  <Hammer className="h-3.5 w-3.5" />
                                  <span>{t.services}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {contractor.services.map((service, index) => (
                                    <Badge key={index} variant="outline">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardFooter className="bg-muted/50 px-6 py-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-green-600 font-medium">{contractor.availability}</span>
                              </div>
                              <div className="flex gap-4 ml-auto">
                                <Button variant="outline">{t.viewProfile}</Button>
                                <Button>{t.contact}</Button>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <p className="text-sm text-muted-foreground">© 2024 Flpr. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </DashboardLayout>
  )
}

