import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it('can be checked and unchecked', async () => {
    render(<Checkbox aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    
    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('handles onCheckedChange callback', async () => {
    const handleCheckedChange = jest.fn()
    render(<Checkbox aria-label="Test checkbox" onCheckedChange={handleCheckedChange} />)
    const checkbox = screen.getByRole('checkbox')
    
    await userEvent.click(checkbox)
    expect(handleCheckedChange).toHaveBeenCalledWith(true)
    
    await userEvent.click(checkbox)
    expect(handleCheckedChange).toHaveBeenCalledWith(false)
  })

  it('can be disabled', () => {
    render(<Checkbox aria-label="Test checkbox" disabled />)
    const checkbox = screen.getByRole('checkbox')
    
    expect(checkbox).toBeDisabled()
    expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<Checkbox aria-label="Test checkbox" className="custom-class" />)
    const checkbox = screen.getByRole('checkbox')
    
    expect(checkbox).toHaveClass('custom-class')
  })

  it('applies checked styles when checked', async () => {
    render(<Checkbox aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    
    await userEvent.click(checkbox)
    expect(checkbox).toHaveClass('data-[state=checked]:bg-primary', 'data-[state=checked]:text-primary-foreground')
  })

  it('renders check icon when checked', async () => {
    render(<Checkbox aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    
    await userEvent.click(checkbox)
    const checkIcon = screen.getByTestId('check-icon')
    expect(checkIcon).toBeInTheDocument()
    expect(checkIcon).toHaveClass('h-3.5', 'w-3.5')
  })

  it('can be controlled', async () => {
    const handleCheckedChange = jest.fn()
    const { rerender } = render(
      <Checkbox 
        aria-label="Test checkbox" 
        checked={true} 
        onCheckedChange={handleCheckedChange} 
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
    
    rerender(
      <Checkbox 
        aria-label="Test checkbox" 
        checked={false} 
        onCheckedChange={handleCheckedChange} 
      />
    )
    expect(checkbox).not.toBeChecked()
  })
}) 