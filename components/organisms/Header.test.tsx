import React from "react"
import { render, screen } from "@/test/test-utils"
import userEvent from "@testing-library/user-event"
import { Header } from "./Header"
import { useAuth } from "@/contexts/auth-context"

// Mock useAuth hook
jest.mock("@/contexts/auth-context")
const mockUseAuth = useAuth as jest.Mock

describe("Header", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it("renders logo and public navigation for unauthenticated users", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
    })

    render(<Header />)

    expect(screen.getByText("Flpr")).toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
    expect(screen.getByText("Sign up")).toBeInTheDocument()
  })

  it("renders authenticated navigation for investor users", () => {
    mockUseAuth.mockReturnValue({
      user: {
        userType: "investor",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      },
      logout: jest.fn(),
    })

    render(<Header />)

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Properties")).toBeInTheDocument()
    expect(screen.getByText("Lenders")).toBeInTheDocument()
    expect(screen.getByText("Contractors")).toBeInTheDocument()
  })

  it("displays user name in dropdown menu when authenticated", () => {
    const mockUser = {
      userType: "investor",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    }

    mockUseAuth.mockReturnValue({
      user: mockUser,
      logout: jest.fn(),
    })

    render(<Header />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("calls logout function when logout button is clicked", async () => {
    const mockLogout = jest.fn()
    mockUseAuth.mockReturnValue({
      user: {
        userType: "investor",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      },
      logout: mockLogout,
    })

    render(<Header />)

    const logoutButton = screen.getByText("Logout")
    logoutButton.click()

    expect(mockLogout).toHaveBeenCalled()
  })
}) 