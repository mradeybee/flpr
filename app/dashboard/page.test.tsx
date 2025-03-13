import { render, screen } from "@/test/test-utils"
import { useRouter } from "next/navigation"
import DashboardPage from "./page"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// Mock translations hook
jest.mock("@/hooks/use-translations", () => ({
  useTranslations: () => ({
    overview: "Overview",
    analytics: "Analytics",
    activity: "Activity",
    addProperty: "Add Property",
  }),
}))

// Mock auth context
jest.mock("@/contexts/auth-context", () => ({
  useAuth: jest.fn(),
}))

// Mock DashboardLayout
jest.mock("@/components/templates/DashboardLayout", () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock Activities component
jest.mock("@/components/organisms/activities", () => ({
  __esModule: true,
  default: () => <div data-testid="activities">Activities</div>,
}))

describe("DashboardPage", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }))
  })

  it("redirects to login if user is not authenticated", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: null,
    }))

    render(<DashboardPage />)
    expect(mockPush).toHaveBeenCalledWith("/login")
  })

  it("renders homeowner dashboard", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "John",
        lastName: "Doe",
        userType: "homeowner",
      },
    }))

    render(<DashboardPage />)

    expect(screen.getByText("Welcome, John Doe")).toBeInTheDocument()
    expect(screen.getByText("Manage your property listings and inquiries")).toBeInTheDocument()
    expect(screen.getByText("Listed Properties")).toBeInTheDocument()
    expect(screen.getByText("Total Views")).toBeInTheDocument()
    expect(screen.getByText("Inquiries")).toBeInTheDocument()
    expect(screen.getByText("Offers")).toBeInTheDocument()
    expect(screen.getByText("Your Properties")).toBeInTheDocument()
  })

  it("renders investor dashboard", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "Jane",
        lastName: "Smith",
        userType: "investor",
      },
    }))

    render(<DashboardPage />)

    expect(screen.getByText("Welcome, Jane Smith")).toBeInTheDocument()
    expect(screen.getByText("Track your investment properties and projects")).toBeInTheDocument()
    expect(screen.getByText("Active Projects")).toBeInTheDocument()
    expect(screen.getByText("Total Investment")).toBeInTheDocument()
    expect(screen.getByText("Projected ROI")).toBeInTheDocument()
    expect(screen.getByText("Your Properties")).toBeInTheDocument()
  })

  it("renders contractor dashboard", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "Mike",
        lastName: "Johnson",
        userType: "contractor",
      },
    }))

    render(<DashboardPage />)

    expect(screen.getByText("Welcome, Mike Johnson")).toBeInTheDocument()
    expect(screen.getByText("Manage your renovation requests and projects")).toBeInTheDocument()
    expect(screen.getByText("Active Projects")).toBeInTheDocument()
    expect(screen.getByText("Pending Requests")).toBeInTheDocument()
    expect(screen.getByText("Total Revenue")).toBeInTheDocument()
    expect(screen.getByText("Project Requests")).toBeInTheDocument()
  })

  it("renders lender dashboard", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "Sarah",
        lastName: "Wilson",
        userType: "lender",
      },
    }))

    render(<DashboardPage />)

    expect(screen.getByText("Welcome, Sarah Wilson")).toBeInTheDocument()
    expect(screen.getByText("Review funding requests and manage loans")).toBeInTheDocument()
    expect(screen.getByText("Active Loans")).toBeInTheDocument()
    expect(screen.getByText("Total Funded")).toBeInTheDocument()
    expect(screen.getByText("Average LTV")).toBeInTheDocument()
    expect(screen.getByText("Loan Requests")).toBeInTheDocument()
  })

  it("switches between dashboard tabs", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "John",
        lastName: "Doe",
        userType: "homeowner",
      },
    }))

    render(<DashboardPage />)

    // Check if all tabs are rendered
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Analytics" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Activity" })).toBeInTheDocument()

    // Check if Overview tab is selected by default
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true")
  })

  it("shows add property button for homeowners and investors", () => {
    // Test for homeowner
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "John",
        lastName: "Doe",
        userType: "homeowner",
      },
    }))

    const { rerender } = render(<DashboardPage />)
    expect(screen.getByRole("button", { name: "Add Property" })).toBeInTheDocument()

    // Test for investor
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "Jane",
        lastName: "Smith",
        userType: "investor",
      },
    }))

    rerender(<DashboardPage />)
    expect(screen.getByRole("button", { name: "Add Property" })).toBeInTheDocument()

    // Test for contractor (should not have add property button)
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "Mike",
        lastName: "Johnson",
        userType: "contractor",
      },
    }))

    rerender(<DashboardPage />)
    expect(screen.queryByRole("button", { name: "Add Property" })).not.toBeInTheDocument()
  })

  it("displays activities component in activity tab", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        firstName: "John",
        lastName: "Doe",
        userType: "homeowner",
      },
    }))

    render(<DashboardPage />)

    // Click on Activity tab
    const activityTab = screen.getByRole("tab", { name: "Activity" })
    activityTab.click()

    // Check if Activities component is rendered
    expect(screen.getByTestId("activities")).toBeInTheDocument()
  })
}) 