import { render, screen, waitFor } from "@/test/test-utils"
import userEvent from "@testing-library/user-event"
import ContactPage from "./page"

type Translations = {
  language: string
  contact: string
  getInTouch: string
  contactDesc: string
  yourName: string
  yourEmail: string
  subject: string
  message: string
  sending: string
  sendMessage: string
  messageSent: string
  messageReceived: string
  contactInfo: string
  email: string
  phone: string
  address: string
  mondayToFriday: string
  faq: string
  howDoISignUp: string
  signUpAnswer: string
  whatAreTheFees: string
  feesAnswer: string
  howDoIListProperty: string
  listPropertyAnswer: string
}

// Mock translations hook
const mockTranslations: Translations = {
  language: "en",
  contact: "Contact",
  getInTouch: "Get in Touch",
  contactDesc: "Contact Description",
  yourName: "Your Name",
  yourEmail: "Your Email",
  subject: "Subject",
  message: "Message",
  sending: "Sending...",
  sendMessage: "Send Message",
  messageSent: "Message sent",
  messageReceived: "Message received",
  contactInfo: "Contact Information",
  email: "Email",
  phone: "Phone",
  address: "Address",
  mondayToFriday: "Monday to Friday",
  faq: "FAQ",
  howDoISignUp: "How do I sign up?",
  signUpAnswer: "Sign up answer",
  whatAreTheFees: "What are the fees?",
  feesAnswer: "Fees answer",
  howDoIListProperty: "How do I list a property?",
  listPropertyAnswer: "List property answer",
}

let mockTranslationsValue: Partial<Translations> = mockTranslations

jest.mock("@/hooks/use-translations", () => ({
  useTranslations: () => mockTranslationsValue,
}))

// Mock toast hook
const mockToast = jest.fn()
jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

// Mock DashboardLayout
jest.mock("@/components/templates/DashboardLayout", () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe("ContactPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockTranslationsValue = mockTranslations
  })

  it("renders contact form and information", () => {
    render(<ContactPage />)

    // Check form elements
    expect(screen.getByText("Contact")).toBeInTheDocument()
    expect(screen.getByText("Get in Touch")).toBeInTheDocument()
    expect(screen.getByLabelText("Your Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Your Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Subject")).toBeInTheDocument()
    expect(screen.getByLabelText("Message")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument()

    // Check contact information
    expect(screen.getByText("Contact Information")).toBeInTheDocument()
    expect(screen.getByText("info@flpr.com")).toBeInTheDocument()
    expect(screen.getByText("(555) 123-4567")).toBeInTheDocument()
    expect(screen.getByText("123 Main Street, Suite 100")).toBeInTheDocument()

    // Check FAQ section
    expect(screen.getByText("FAQ")).toBeInTheDocument()
    expect(screen.getByText("How do I sign up?")).toBeInTheDocument()
    expect(screen.getByText("What are the fees?")).toBeInTheDocument()
    expect(screen.getByText("How do I list a property?")).toBeInTheDocument()
  })

  it("shows loading skeleton when translations are not loaded", () => {
    mockTranslationsValue = {}
    render(<ContactPage />)

    // Check for skeleton elements
    const skeletons = screen.getAllByTestId("skeleton")
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it("handles form submission correctly", async () => {
    const user = userEvent.setup()

    render(<ContactPage />)

    // Fill out the form
    await user.type(screen.getByLabelText("Your Name"), "John Doe")
    await user.type(screen.getByLabelText("Your Email"), "john@example.com")
    await user.type(screen.getByLabelText("Subject"), "Test Subject")
    await user.type(screen.getByLabelText("Message"), "Test Message")

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Send Message" })
    await user.click(submitButton)

    // Check loading state
    expect(screen.getByText("Sending...")).toBeInTheDocument()
    expect(submitButton).toBeDisabled()

    // Wait for submission to complete
    await waitFor(
      () => {
        expect(mockToast).toHaveBeenCalledWith({
          title: "Message sent",
          description: "Message received",
        })
      },
      { timeout: 2000 }
    )

    // Check form is reset
    expect(screen.getByLabelText("Your Name")).toHaveValue("")
    expect(screen.getByLabelText("Your Email")).toHaveValue("")
    expect(screen.getByLabelText("Subject")).toHaveValue("")
    expect(screen.getByLabelText("Message")).toHaveValue("")
  })

  it("requires all form fields", async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    // Try to submit empty form
    await user.click(screen.getByRole("button", { name: "Send Message" }))

    // Check that HTML5 validation prevents submission
    expect(screen.getByLabelText("Your Name")).toBeInvalid()
    expect(screen.getByLabelText("Your Email")).toBeInvalid()
    expect(screen.getByLabelText("Subject")).toBeInvalid()
    expect(screen.getByLabelText("Message")).toBeInvalid()
  })
}) 