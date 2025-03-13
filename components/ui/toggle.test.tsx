import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Toggle } from './toggle'

describe('Toggle', () => {
  it('renders toggle with children', () => {
    render(<Toggle>Toggle me</Toggle>)
    expect(screen.getByText('Toggle me')).toBeInTheDocument()
  })

  it('handles pressed state', async () => {
    render(<Toggle>Toggle me</Toggle>)
    const toggle = screen.getByRole('button')

    expect(toggle).toHaveAttribute('data-state', 'off')
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('data-state', 'on')
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('data-state', 'off')
  })

  it('handles onPressedChange callback', async () => {
    const handlePressedChange = jest.fn()
    render(<Toggle onPressedChange={handlePressedChange}>Toggle me</Toggle>)
    const toggle = screen.getByRole('button')

    await userEvent.click(toggle)
    expect(handlePressedChange).toHaveBeenCalledWith(true)

    await userEvent.click(toggle)
    expect(handlePressedChange).toHaveBeenCalledWith(false)
  })

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Toggle variant="default">Default</Toggle>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent')

    rerender(<Toggle variant="outline">Outline</Toggle>)
    expect(screen.getByRole('button')).toHaveClass(
      'border',
      'border-input',
      'bg-transparent',
      'hover:bg-accent',
      'hover:text-accent-foreground'
    )
  })

  it('applies size styles correctly', () => {
    const { rerender } = render(<Toggle size="default">Default</Toggle>)
    expect(screen.getByRole('button')).toHaveClass('h-10', 'px-3', 'min-w-10')

    rerender(<Toggle size="sm">Small</Toggle>)
    expect(screen.getByRole('button')).toHaveClass('h-9', 'px-2.5', 'min-w-9')

    rerender(<Toggle size="lg">Large</Toggle>)
    expect(screen.getByRole('button')).toHaveClass('h-11', 'px-5', 'min-w-11')
  })

  it('can be disabled', () => {
    render(<Toggle disabled>Disabled</Toggle>)
    const toggle = screen.getByRole('button')

    expect(toggle).toBeDisabled()
    expect(toggle).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<Toggle className="custom-toggle">Toggle me</Toggle>)
    expect(screen.getByRole('button')).toHaveClass('custom-toggle')
  })

  it('applies pressed styles', async () => {
    render(<Toggle>Toggle me</Toggle>)
    const toggle = screen.getByRole('button')

    await userEvent.click(toggle)
    expect(toggle).toHaveClass('data-[state=on]:bg-accent', 'data-[state=on]:text-accent-foreground')
  })

  it('handles defaultPressed prop', () => {
    render(<Toggle defaultPressed>Toggle me</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on')
  })

  it('can be controlled', () => {
    const { rerender } = render(<Toggle pressed>Toggle me</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on')

    rerender(<Toggle pressed={false}>Toggle me</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off')
  })
}) 