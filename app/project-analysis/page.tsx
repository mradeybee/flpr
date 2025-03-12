"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Hammer, DollarSign, Brain, Upload, Clock, BarChart3, Lightbulb } from "lucide-react"
import Layout from "@/components/layout"
import { useTranslations } from "@/hooks/use-translations"

export default function ProjectAnalysisPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedTab, setSelectedTab] = useState("form")
  const t = useTranslations()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    setSelectedTab("results")

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

  return (
    <Layout>
      <div className="py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-flipr-orange" />
              <h1 className="text-3xl font-bold tracking-tight">{t.aiProjectAnalysis}</h1>
            </div>
            <p className="text-muted-foreground max-w-3xl">{t.aiProjectDesc}</p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="form">{t.projectDetails}</TabsTrigger>
              <TabsTrigger value="results" disabled={!isAnalyzing && !analysisComplete}>
                {t.analysisResults}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                  <CardHeader>
                    <CardTitle>{t.enterProjectDetails}</CardTitle>
                    <CardDescription>{t.provideInfoForAnalysis}</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="property-type">Property Type</Label>
                        <Select defaultValue="single">
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single Family Home</SelectItem>
                            <SelectItem value="multi">Multi-Family</SelectItem>
                            <SelectItem value="condo">Condo/Townhouse</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="square-footage">Square Footage</Label>
                          <Input id="square-footage" type="number" placeholder="e.g. 1500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="property-age">Property Age (years)</Label>
                          <Input id="property-age" type="number" placeholder="e.g. 25" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Project Scope</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="kitchen" />
                            <label htmlFor="kitchen" className="text-sm">
                              Kitchen Renovation
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="bathroom" />
                            <label htmlFor="bathroom" className="text-sm">
                              Bathroom Remodel
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="flooring" />
                            <label htmlFor="flooring" className="text-sm">
                              Flooring Replacement
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="painting" />
                            <label htmlFor="painting" className="text-sm">
                              Interior Painting
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="electrical" />
                            <label htmlFor="electrical" className="text-sm">
                              Electrical Updates
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="plumbing" />
                            <label htmlFor="plumbing" className="text-sm">
                              Plumbing Work
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="roofing" />
                            <label htmlFor="roofing" className="text-sm">
                              Roof Repair/Replace
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="hvac" />
                            <label htmlFor="hvac" className="text-sm">
                              HVAC Replacement
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Quality Level</Label>
                        <RadioGroup defaultValue="standard">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="budget" id="budget" />
                            <Label htmlFor="budget">Budget-Friendly</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard">Standard Quality</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="premium" id="premium" />
                            <Label htmlFor="premium">Premium Finishes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="luxury" id="luxury" />
                            <Label htmlFor="luxury">Luxury Grade</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Project Location (ZIP Code)</Label>
                        <Input id="location" placeholder="e.g. 78701" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additional-details">Additional Details</Label>
                        <Textarea
                          id="additional-details"
                          placeholder="Describe any specific requirements or challenges for your project..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Property Photos (Optional)
                        </Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                          <p className="text-sm text-muted-foreground">Drag and drop photos here, or click to browse</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full bg-flipr-orange hover:bg-flipr-orange/90">
                        Analyze Project
                      </Button>
                    </CardFooter>
                  </form>
                </Card>

                <div className="space-y-6">
                  <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-flipr-orange" />
                        {t.whyUseAIAnalysis}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="flex gap-2">
                        <DollarSign className="h-5 w-5 text-flipr-orange shrink-0" />
                        <p>Get accurate cost estimates based on current market rates and your specific requirements</p>
                      </div>
                      <div className="flex gap-2">
                        <Clock className="h-5 w-5 text-flipr-orange shrink-0" />
                        <p>Receive realistic timeline projections for your renovation project</p>
                      </div>
                      <div className="flex gap-2">
                        <Hammer className="h-5 w-5 text-flipr-orange shrink-0" />
                        <p>Identify potential challenges and material requirements before starting work</p>
                      </div>
                      <div className="flex gap-2">
                        <BarChart3 className="h-5 w-5 text-flipr-orange shrink-0" />
                        <p>Compare different quality levels and scope options to optimize your budget</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-flipr-orange/10 flipr-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{t.needHelp}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <p>{t.teamAvailable}</p>
                      <Button
                        variant="outline"
                        className="w-full border-flipr-orange text-flipr-orange hover:bg-flipr-orange/10"
                      >
                        {t.contactSupport}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results">
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
                      <p className={`transition-opacity duration-500 ${progress > 20 ? "opacity-100" : "opacity-0"}`}>
                        {t.calculatingMaterials}
                      </p>
                      <p className={`transition-opacity duration-500 ${progress > 40 ? "opacity-100" : "opacity-0"}`}>
                        {t.estimatingLabor}
                      </p>
                      <p className={`transition-opacity duration-500 ${progress > 60 ? "opacity-100" : "opacity-0"}`}>
                        {t.generatingTimeline}
                      </p>
                      <p className={`transition-opacity duration-500 ${progress > 80 ? "opacity-100" : "opacity-0"}`}>
                        {t.finalizingAnalysis}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : analysisComplete ? (
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
                                  <p className="text-muted-foreground">1 {t.weeks.slice(0, -1)}</p>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">{t.aiRecommendations}</h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                  <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <span>{t.considerUpgrading}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                  <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <span>{t.prioritizeKitchen}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                  <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <span>{t.scheduleWork}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                  <Check className="h-3 w-3 text-green-600" />
                                </div>
                                <span>{t.considerOpenFloor}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <Button
                      onClick={() => setSelectedTab("form")}
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
              ) : null}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
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

