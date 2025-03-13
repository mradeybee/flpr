import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock translations hook
jest.mock('@/hooks/use-translations', () => ({
  useTranslations: () => ({
    // Add common translations used in tests
    appName: 'Flpr',
    login: 'Log in',
    signup: 'Sign up',
    dashboard: 'Dashboard',
    properties: 'Properties',
    lenders: 'Lenders',
    contractors: 'Contractors',
    settings: 'Settings',
    logout: 'Logout',
  }),
})) 