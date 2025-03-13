import { render, screen, waitFor } from "@/test/test-utils"
import { useRouter } from "next/navigation"
import HomePage from "./page"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// Mock auth context
jest.mock("@/contexts/auth-context", () => ({
  useAuth: jest.fn(),
}))

// Mock translations hook
jest.mock("@/hooks/use-translations", () => ({
  useTranslations: () => ({
    heroTitle: "Hero Title",
    heroSubtitle: "Hero Subtitle",
    browseProperties: "Browse Properties",
    joinFlipr: "Join Flipr",
    howItWorks: "How It Works",
    howItWorksSubtitle: "How It Works Subtitle",
    listProperty: "List Property",
    listPropertyDesc: "List Property Description",
    analyzeInvest: "Analyze Investment",
    analyzeInvestDesc: "Analyze Investment Description",
    secureFunding: "Secure Funding",
    secureFundingDesc: "Secure Funding Description",
    hireContractors: "Hire Contractors",
    hireContractorsDesc: "Hire Contractors Description",
    tryAIAnalysis: "Try AI Analysis",
    aiAnalysisDesc: "AI Analysis Description",
    pricingPlans: "Pricing Plans",
    pricingPlansDesc: "Pricing Plans Description",
    homeownerPlan: "Homeowner Plan",
    free: "Free",
    homeownerPlanDesc: "Homeowner Plan Description",
    investorPlan: "Investor Plan",
    perMonth: "per month",
    investorPlanDesc: "Investor Plan Description",
    contractorPlan: "Contractor Plan",
    contractorPlanDesc: "Contractor Plan Description",
    lenderPlan: "Lender Plan",
    lenderPlanDesc: "Lender Plan Description",
    viewAllFeatures: "View All Features",
    joinCommunity: "Join Community",
    joinCommunityDesc: "Join Community Description",
    getStarted: "Get Started",
    activeProperties: "Active Properties",
    fundedProjects: "Funded Projects",
    verifiedContractors: "Verified Contractors",
    lendingPartners: "Lending Partners",
  }),
}))

describe("HomePage", () => {
  const mockPush = jest.fn()
  const mockUseRouter = useRouter as jest.Mock
  
  beforeEach(() => {
    mockPush.mockClear()
    mockUseRouter.mockImplementation(() => ({
      push: mockPush,
    }))
  })

  it("redirects to dashboard when user is logged in", async () => {
    const mockUseAuth = require("@/contexts/auth-context").useAuth as jest.Mock
    mockUseAuth.mockReturnValue({ user: { id: "1" } })

    render(<HomePage />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard")
    })
  })

  it("renders homepage content when user is not logged in", () => {
    const mockUseAuth = require("@/contexts/auth-context").useAuth as jest.Mock
    mockUseAuth.mockReturnValue({ user: null })

    render(<HomePage />)

    // Hero section
    expect(screen.getByText("Hero Title")).toBeInTheDocument()
    expect(screen.getByText("Hero Subtitle")).toBeInTheDocument()
    expect(screen.getByText("Browse Properties")).toBeInTheDocument()
    expect(screen.getByText("Join Flipr")).toBeInTheDocument()

    // How it works section
    expect(screen.getByText("How It Works")).toBeInTheDocument()
    expect(screen.getByText("How It Works Subtitle")).toBeInTheDocument()
    expect(screen.getByText("List Property")).toBeInTheDocument()
    expect(screen.getByText("Analyze Investment")).toBeInTheDocument()
    expect(screen.getByText("Secure Funding")).toBeInTheDocument()
    expect(screen.getByText("Hire Contractors")).toBeInTheDocument()

    // Pricing section
    expect(screen.getByText("Pricing Plans")).toBeInTheDocument()
    expect(screen.getByText("Homeowner Plan")).toBeInTheDocument()
    expect(screen.getByText("Investor Plan")).toBeInTheDocument()
    expect(screen.getByText("Contractor Plan")).toBeInTheDocument()
    expect(screen.getByText("Lender Plan")).toBeInTheDocument()

    // Community section
    expect(screen.getByText("Join Community")).toBeInTheDocument()
    expect(screen.getByText("500+")).toBeInTheDocument()
    expect(screen.getByText("$25M+")).toBeInTheDocument()
    expect(screen.getByText("300+")).toBeInTheDocument()
    expect(screen.getByText("50+")).toBeInTheDocument()
  })

  it("renders all navigation links correctly", () => {
    const mockUseAuth = require("@/contexts/auth-context").useAuth as jest.Mock
    mockUseAuth.mockReturnValue({ user: null })

    render(<HomePage />)

    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(7) // Update this number based on actual number of links

    expect(screen.getByRole("link", { name: "Browse Properties" })).toHaveAttribute("href", "/properties")
    expect(screen.getByRole("link", { name: "Join Flipr" })).toHaveAttribute("href", "/signup")
    expect(screen.getByRole("link", { name: /Try AI Analysis/i })).toHaveAttribute("href", "/project-analysis")
    expect(screen.getByRole("link", { name: "View All Features" })).toHaveAttribute("href", "/pricing")
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/signup")
  })

  it("renders pricing cards with correct information", () => {
    const mockUseAuth = require("@/contexts/auth-context").useAuth as jest.Mock
    mockUseAuth.mockReturnValue({ user: null })

    render(<HomePage />)

    // Check pricing card details
    expect(screen.getByText("Free")).toBeInTheDocument()
    expect(screen.getByText("$20")).toBeInTheDocument()
    expect(screen.getByText("$50")).toBeInTheDocument()
    expect(screen.getAllByText("per month")).toHaveLength(3)
  })
}) 