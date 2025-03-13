import { render, screen, waitFor } from "@/test/test-utils"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/navigation"
import LoginPage from "./page"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// Mock translations hook
jest.mock("@/hooks/use-translations", () => ({
  useTranslations: () => ({
    appName: "Flipr",
    signInToAccount: "Sign in to your account",
    socialLogin: "Social Login",
    signIn: "Sign In",
    enterCredentials: "Enter your credentials",
    password: "Password",
    forgotPassword: "Forgot Password?",
    rememberMe: "Remember me",
    signingIn: "Signing in...",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    socialMediaSignIn: "Sign in with social media",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    continueWithGithub: "Continue with Github",
  }),
}))

// Mock auth context
jest.mock("@/contexts/auth-context", () => ({
  useAuth: jest.fn(),
}))

// Mock toast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

// Mock MainLayout
jest.mock("@/components/templates/MainLayout", () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe("LoginPage", () => {
  const mockPush = jest.fn()
  const mockLogin = jest.fn()
  const mockToast = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }))
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      login: mockLogin,
      user: null,
    }))
    require("@/components/ui/use-toast").useToast.mockImplementation(() => ({
      toast: mockToast,
    }))
  })

  it("redirects to dashboard if user is already logged in", () => {
    require("@/contexts/auth-context").useAuth.mockImplementation(() => ({
      login: mockLogin,
      user: { id: "1" },
    }))

    render(<LoginPage />)
    expect(mockPush).toHaveBeenCalledWith("/dashboard")
  })

  it("renders login form with email and password fields", () => {
    render(<LoginPage />)

    expect(screen.getByText("Flipr")).toBeInTheDocument()
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
  })

  it("handles successful login", async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(true)

    render(<LoginPage />)

    await user.type(screen.getByLabelText("Email"), "test@example.com")
    await user.type(screen.getByLabelText("Password"), "password123")
    await user.click(screen.getByRole("button", { name: "Sign In" }))

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123")
    expect(mockToast).toHaveBeenCalledWith({
      title: "Login successful",
      description: "Welcome back to Flipr!",
    })
    expect(mockPush).toHaveBeenCalledWith("/dashboard")
  })

  it("handles failed login", async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(false)

    render(<LoginPage />)

    await user.type(screen.getByLabelText("Email"), "test@example.com")
    await user.type(screen.getByLabelText("Password"), "wrongpassword")
    await user.click(screen.getByRole("button", { name: "Sign In" }))

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "wrongpassword")
    expect(mockToast).toHaveBeenCalledWith({
      title: "Login failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("handles login error", async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValueOnce(new Error("Network error"))

    render(<LoginPage />)

    await user.type(screen.getByLabelText("Email"), "test@example.com")
    await user.type(screen.getByLabelText("Password"), "password123")
    await user.click(screen.getByRole("button", { name: "Sign In" }))

    expect(mockToast).toHaveBeenCalledWith({
      title: "Login failed",
      description: "An error occurred. Please try again.",
      variant: "destructive",
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("switches between email and social login tabs", async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    // Initially on email tab
    expect(screen.getByText("Enter your credentials")).toBeInTheDocument()

    // Switch to social login tab
    await user.click(screen.getByRole("tab", { name: "Social Login" }))
    expect(screen.getByText("Sign in with social media")).toBeInTheDocument()
    expect(screen.getByText("Continue with Google")).toBeInTheDocument()
    expect(screen.getByText("Continue with Facebook")).toBeInTheDocument()
    expect(screen.getByText("Continue with Github")).toBeInTheDocument()

    // Switch back to email tab
    await user.click(screen.getByRole("tab", { name: "Email" }))
    expect(screen.getByText("Enter your credentials")).toBeInTheDocument()
  })

  it("navigates to signup page when clicking signup link", async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.click(screen.getByRole("link", { name: "Sign Up" }))
    expect(screen.getByRole("link", { name: "Sign Up" })).toHaveAttribute("href", "/signup")
  })

  it("navigates to forgot password page when clicking forgot password link", async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.click(screen.getByRole("link", { name: "Forgot Password?" }))
    expect(screen.getByRole("link", { name: "Forgot Password?" })).toHaveAttribute("href", "/forgot-password")
  })

  it("shows loading state during login", async () => {
    const user = userEvent.setup()
    mockLogin.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve(true), 100)))

    render(<LoginPage />)

    await user.type(screen.getByLabelText("Email"), "test@example.com")
    await user.type(screen.getByLabelText("Password"), "password123")
    await user.click(screen.getByRole("button", { name: "Sign In" }))

    expect(screen.getByRole("button", { name: "Signing in..." })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Signing in..." })).toBeDisabled()

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Signing in..." })).not.toBeInTheDocument()
    })
  })
}) 