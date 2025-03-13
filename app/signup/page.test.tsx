import { render, screen, waitFor } from "@/test/test-utils"
import userEvent from "@testing-library/user-event"
import { useRouter, useSearchParams } from "next/navigation"
import SignupPage from "./page"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Mock translations hook
jest.mock("@/hooks/use-translations", () => ({
  useTranslations: () => ({
    appName: "Flipr",
    createAccount: "Create an account",
    chooseAccountType: "Choose Account Type",
    selectAccountType: "Select your account type",
    homeowner: "Homeowner",
    homeownerDesc: "List your property",
    investor: "Investor",
    investorDesc: "Find investment properties",
    lender: "Lender",
    lenderDesc: "Fund projects",
    contractor: "Contractor",
    contractorDesc: "Find work opportunities",
    free: "Free",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign In",
    createYourAccount: "Create Your Account",
    fillDetailsToCompleteRegistration: "Fill in your details to complete registration",
    perMonth: "/month",
    freeTrialPeriod: "14-day free trial",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    passwordRequirements: "Password requirements",
    propertyStatus: "Property Status",
    readyToListNow: "Ready to list now",
    planningToListSoon: "Planning to list soon",
    justExploringOptions: "Just exploring options",
    servicesOffered: "Services Offered",
    generalContracting: "General Contracting",
    plumbing: "Plumbing",
    electrical: "Electrical",
    hvac: "HVAC",
    roofing: "Roofing",
    painting: "Painting",
  }),
}))

// Mock auth context
jest.mock("@/contexts/auth-context", () => ({
  useAuth: jest.fn(),
}))

// Mock MainLayout
jest.mock("@/components/templates/MainLayout", () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe("SignupPage", () => {
  const mockPush = jest.fn()
  const mockGet = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }))
    ;(useSearchParams as jest.Mock).mockImplementation(() => ({
      get: mockGet,
    }))
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: null,
    }))
  })

  it("redirects to dashboard if user is already logged in", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: { id: "1" },
    }))

    render(<SignupPage />)
    expect(mockPush).toHaveBeenCalledWith("/dashboard")
  })

  it("renders account type selection step by default", () => {
    render(<SignupPage />)

    expect(screen.getByText("Choose Account Type")).toBeInTheDocument()
    expect(screen.getByText("Homeowner")).toBeInTheDocument()
    expect(screen.getByText("Investor")).toBeInTheDocument()
    expect(screen.getByText("Lender")).toBeInTheDocument()
    expect(screen.getByText("Contractor")).toBeInTheDocument()
  })

  it("moves to registration form when account type is selected", async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    await user.click(screen.getByText("Homeowner"))
    expect(screen.getByText("Create Your Account")).toBeInTheDocument()
    expect(screen.getByLabelText("First Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  it("shows property status options for homeowner registration", async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    await user.click(screen.getByText("Homeowner"))
    expect(screen.getByText("Property Status")).toBeInTheDocument()
    expect(screen.getByLabelText("Ready to list now")).toBeInTheDocument()
    expect(screen.getByLabelText("Planning to list soon")).toBeInTheDocument()
    expect(screen.getByLabelText("Just exploring options")).toBeInTheDocument()
  })

  it("shows services options for contractor registration", async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    await user.click(screen.getByText("Contractor"))
    expect(screen.getByText("Services Offered")).toBeInTheDocument()
    expect(screen.getByLabelText("General Contracting")).toBeInTheDocument()
    expect(screen.getByLabelText("Plumbing")).toBeInTheDocument()
    expect(screen.getByLabelText("Electrical")).toBeInTheDocument()
    expect(screen.getByLabelText("HVAC")).toBeInTheDocument()
    expect(screen.getByLabelText("Roofing")).toBeInTheDocument()
    expect(screen.getByLabelText("Painting")).toBeInTheDocument()
  })

  it("shows pricing information for paid account types", async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    await user.click(screen.getByText("Investor"))
    expect(screen.getByText("$20/month")).toBeInTheDocument()
    expect(screen.getByText("14-day free trial")).toBeInTheDocument()

    await user.click(screen.getByText("Lender"))
    expect(screen.getByText("$50/month")).toBeInTheDocument()
    expect(screen.getByText("14-day free trial")).toBeInTheDocument()
  })

  it("handles form submission and redirects to dashboard", async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    await user.click(screen.getByText("Homeowner"))
    await user.type(screen.getByLabelText("First Name"), "John")
    await user.type(screen.getByLabelText("Last Name"), "Doe")
    await user.type(screen.getByLabelText("Email"), "john@example.com")
    await user.type(screen.getByLabelText("Password"), "password123")

    await user.click(screen.getByRole("button", { name: /Sign Up/i }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard")
    })
  })

  it("preselects account type from URL parameter", () => {
    mockGet.mockReturnValue("investor")
    render(<SignupPage />)

    expect(screen.getByText("Create Your Account")).toBeInTheDocument()
    expect(screen.getByText("$20/month")).toBeInTheDocument()
  })

  it("navigates to login page when clicking sign in link", async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    await user.click(screen.getByRole("link", { name: "Sign In" }))
    expect(screen.getByRole("link", { name: "Sign In" })).toHaveAttribute("href", "/login")
  })

  it("shows loading state during form submission", async () => {
    const user = userEvent.setup()
    render(<SignupPage />)

    await user.click(screen.getByText("Homeowner"))
    await user.type(screen.getByLabelText("First Name"), "John")
    await user.type(screen.getByLabelText("Last Name"), "Doe")
    await user.type(screen.getByLabelText("Email"), "john@example.com")
    await user.type(screen.getByLabelText("Password"), "password123")

    await user.click(screen.getByRole("button", { name: /Sign Up/i }))

    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeDisabled()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard")
    })
  })
}) 