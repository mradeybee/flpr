import { render, screen } from "@/test/test-utils"
import { useRouter } from "next/navigation"
import PropertiesPage from "./page"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

// Mock translations hook
jest.mock("@/hooks/use-translations", () => ({
  useTranslations: () => ({
    findYourNextFlip: "Find Your Next Flip",
    browseFlipDesc: "Browse properties ready for renovation",
    filters: "Filters",
    narrowSearch: "Narrow your search",
    showing: "Showing",
    properties: "Properties",
    sortBy: "Sort by",
    newest: "Newest",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    highestROI: "Highest ROI",
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

describe("PropertiesPage", () => {
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

    render(<PropertiesPage />)
    expect(mockPush).toHaveBeenCalledWith("/login")
  })

  it("redirects to dashboard if user is not investor or homeowner", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "contractor",
      },
    }))

    render(<PropertiesPage />)
    expect(mockPush).toHaveBeenCalledWith("/dashboard")
  })

  it("renders properties page for investor", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertiesPage />)

    expect(screen.getByText("Find Your Next Flip")).toBeInTheDocument()
    expect(screen.getByText("Browse properties ready for renovation")).toBeInTheDocument()
    expect(screen.getByText("Filters")).toBeInTheDocument()
  })

  it("renders properties page for homeowner", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "homeowner",
      },
    }))

    render(<PropertiesPage />)

    expect(screen.getByText("Find Your Next Flip")).toBeInTheDocument()
    expect(screen.getByText("Browse properties ready for renovation")).toBeInTheDocument()
    expect(screen.getByText("Filters")).toBeInTheDocument()
  })

  it("renders filter options", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertiesPage />)

    expect(screen.getByPlaceholderText("City, State, or ZIP")).toBeInTheDocument()
    expect(screen.getByText("Price Range")).toBeInTheDocument()
    expect(screen.getByText("Property Type")).toBeInTheDocument()
    expect(screen.getByText("Beds")).toBeInTheDocument()
    expect(screen.getByText("Baths")).toBeInTheDocument()
    expect(screen.getByText("Potential ROI")).toBeInTheDocument()
  })

  it("renders property listings", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertiesPage />)

    expect(screen.getByText("Fixer-Upper Ranch Style Home")).toBeInTheDocument()
    expect(screen.getByText("Distressed Victorian with Potential")).toBeInTheDocument()
    expect(screen.getByText("Mid-Century Modern Needs TLC")).toBeInTheDocument()
  })

  it("displays property details in listings", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertiesPage />)

    expect(screen.getByText("123 Renovation Ave, Austin, TX 78701")).toBeInTheDocument()
    expect(screen.getByText("$275,000")).toBeInTheDocument()
    expect(screen.getByText("1,850 sqft")).toBeInTheDocument()
    expect(screen.getByText("3 beds")).toBeInTheDocument()
    expect(screen.getByText("2 baths")).toBeInTheDocument()
  })

  it("shows sorting options", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertiesPage />)

    expect(screen.getByText("Sort by")).toBeInTheDocument()
    expect(screen.getByText("Newest")).toBeInTheDocument()
  })

  it("displays property status badges", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertiesPage />)

    expect(screen.getAllByText("For Sale")).toHaveLength(5)
    expect(screen.getByText("Under Contract")).toBeInTheDocument()
  })
}) 