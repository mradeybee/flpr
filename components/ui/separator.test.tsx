import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import { Separator } from './separator'

describe('Separator', () => {
  it('renders horizontal separator by default', () => {
    render(<Separator />)
    const separator = screen.getByRole('separator')

    expect(separator).toBeInTheDocument()
    expect(separator).toHaveClass('h-[1px]', 'w-full')
  })

  it('renders vertical separator', () => {
    render(<Separator orientation="vertical" />)
    const separator = screen.getByRole('separator')

    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('applies default styles', () => {
    render(<Separator />)
    const separator = screen.getByRole('separator')

    expect(separator).toHaveClass('shrink-0', 'bg-border')
  })

  it('applies custom className', () => {
    render(<Separator className="custom-separator" />)
    const separator = screen.getByRole('separator')

    expect(separator).toHaveClass('custom-separator')
  })

  it('is decorative by default', () => {
    render(<Separator />)
    const separator = screen.getByRole('separator')

    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('can be non-decorative', () => {
    render(<Separator decorative={false} />)
    const separator = screen.getByRole('separator')

    expect(separator).not.toHaveAttribute('data-orientation')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('handles orientation change', () => {
    const { rerender } = render(<Separator orientation="horizontal" />)
    const separator = screen.getByRole('separator')

    expect(separator).toHaveClass('h-[1px]', 'w-full')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')

    rerender(<Separator orientation="vertical" />)
    expect(separator).toHaveClass('h-full', 'w-[1px]')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
    expect(separator).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Separator ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
}) 