import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input', () => {
  it('renders with default attributes', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('h-10', 'w-full', 'rounded-md', 'border')
  })

  it('handles text input correctly', async () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    
    await userEvent.type(input, 'Hello, World!')
    expect(input).toHaveValue('Hello, World!')
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    
    expect(input).toHaveClass('custom-class')
  })

  it('handles different input types', () => {
    render(
      <>
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
        <Input type="email" placeholder="Email" />
      </>
    )

    const passwordInput = screen.getByPlaceholderText('Password')
    const numberInput = screen.getByPlaceholderText('Number')
    const emailInput = screen.getByPlaceholderText('Email')

    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(numberInput).toHaveAttribute('type', 'number')
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('handles required attribute', () => {
    render(<Input required placeholder="Required input" />)
    const input = screen.getByPlaceholderText('Required input')
    
    expect(input).toBeRequired()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="Test input" />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
}) 