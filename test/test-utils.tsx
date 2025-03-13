import React from 'react'
import { render as rtlRender, screen, waitFor, type RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '@/contexts/auth-context'

// Mock auth states
export const mockNoAuth = {
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
  isLoading: false,
}

export const mockAuthState = {
  user: {
    id: "1",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    userType: "investor",
  },
  login: jest.fn(),
  logout: jest.fn(),
  isLoading: false,
}

function render(
  ui: React.ReactElement,
  options: Omit<RenderOptions, 'wrapper'> = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { render, screen, waitFor, userEvent } 