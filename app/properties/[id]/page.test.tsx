import { render, screen } from "@/test/test-utils"
import { useRouter, useParams } from "next/navigation"
import PropertyDetailsPage from "./page"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}))

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

// Mock translations hook
jest.mock("@/hooks/use-translations", () => ({
  useTranslations: () => ({
    propertyDetails: "Property Details",
    propertyDescription: "Property Description",
    propertyFeatures: "Property Features",
    propertyAnalysis: "Property Analysis",
    propertyLocation: "Property Location",
    propertyPhotos: "Property Photos",
    propertyDocuments: "Property Documents",
    propertyHistory: "Property History",
    propertyContact: "Property Contact",
    propertyInquiry: "Property Inquiry",
    propertyShare: "Share Property",
    propertyReport: "Report Property",
    propertyFavorite: "Add to Favorites",
    propertySchedule: "Schedule Viewing",
    propertyOffer: "Make Offer",
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

describe("PropertyDetailsPage", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }))
    ;(useParams as jest.Mock).mockImplementation(() => ({
      id: "1",
    }))
  })

  it("redirects to login if user is not authenticated", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: null,
    }))

    render(<PropertyDetailsPage />)
    expect(mockPush).toHaveBeenCalledWith("/login")
  })

  it("redirects to dashboard if user is not investor or homeowner", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "contractor",
      },
    }))

    render(<PropertyDetailsPage />)
    expect(mockPush).toHaveBeenCalledWith("/dashboard")
  })

  it("renders property details for investor", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertyDetailsPage />)

    expect(screen.getByText("Property Details")).toBeInTheDocument()
    expect(screen.getByText("Property Analysis")).toBeInTheDocument()
    expect(screen.getByText("Property Location")).toBeInTheDocument()
    expect(screen.getByText("Property Photos")).toBeInTheDocument()
  })

  it("renders property details for homeowner", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "homeowner",
      },
    }))

    render(<PropertyDetailsPage />)

    expect(screen.getByText("Property Details")).toBeInTheDocument()
    expect(screen.getByText("Property Features")).toBeInTheDocument()
    expect(screen.getByText("Property Location")).toBeInTheDocument()
    expect(screen.getByText("Property Photos")).toBeInTheDocument()
  })

  it("displays property information", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertyDetailsPage />)

    expect(screen.getByText("Fixer-Upper Ranch Style Home")).toBeInTheDocument()
    expect(screen.getByText("123 Renovation Ave, Austin, TX 78701")).toBeInTheDocument()
    expect(screen.getByText("$275,000")).toBeInTheDocument()
    expect(screen.getByText("1,850 sqft")).toBeInTheDocument()
    expect(screen.getByText("3 beds")).toBeInTheDocument()
    expect(screen.getByText("2 baths")).toBeInTheDocument()
  })

  it("shows property analysis for investors", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertyDetailsPage />)

    expect(screen.getByText("After Repair Value (ARV)")).toBeInTheDocument()
    expect(screen.getByText("$425,000")).toBeInTheDocument()
    expect(screen.getByText("Estimated Repair Cost")).toBeInTheDocument()
    expect(screen.getByText("$75,000")).toBeInTheDocument()
  })

  it("shows action buttons", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertyDetailsPage />)

    expect(screen.getByText("Schedule Viewing")).toBeInTheDocument()
    expect(screen.getByText("Make Offer")).toBeInTheDocument()
    expect(screen.getByText("Add to Favorites")).toBeInTheDocument()
    expect(screen.getByText("Share Property")).toBeInTheDocument()
  })

  it("displays property photos", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertyDetailsPage />)

    const images = screen.getAllByRole("img")
    expect(images.length).toBeGreaterThan(0)
  })

  it("shows property contact information", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      user: {
        userType: "investor",
      },
    }))

    render(<PropertyDetailsPage />)

    expect(screen.getByText("Property Contact")).toBeInTheDocument()
    expect(screen.getByText("Send Message")).toBeInTheDocument()
  })
}) 