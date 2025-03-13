import { render, screen } from "@/test/test-utils"
import RootLayout from "./layout"

jest.mock("next/font/google", () => ({
  Inter: () => ({
    className: "mocked-font-class",
  }),
}))

jest.mock("@/contexts/language-context", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock("@/contexts/auth-context", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock("@/components/cookie-consent", () => ({
  CookieConsent: () => <div data-testid="cookie-consent">Cookie Consent</div>,
}))

jest.mock("@/components/protected-route", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="protected-route">{children}</div>,
}))

jest.mock("@/components/ui/toaster", () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
}))

describe("RootLayout", () => {
  it("renders children within the layout structure", () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId("test-child")).toBeInTheDocument()
    expect(screen.getByTestId("protected-route")).toBeInTheDocument()
    expect(screen.getByTestId("cookie-consent")).toBeInTheDocument()
    expect(screen.getByTestId("toaster")).toBeInTheDocument()
  })

  it("applies the Inter font class to the body", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const body = screen.getByText("Test Content").parentElement
    expect(body).toHaveClass("mocked-font-class")
  })

  it("sets the correct lang attribute on html element", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const html = document.documentElement
    expect(html).toHaveAttribute("lang", "en")
  })
}) 