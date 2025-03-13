import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import { Progress } from './progress'

describe('Progress', () => {
  it('renders progress bar with default styles', () => {
    render(<Progress value={0} />)
    const progressBar = screen.getByRole('progressbar')

    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveClass(
      'relative',
      'h-4',
      'w-full',
      'overflow-hidden',
      'rounded-full',
      'bg-secondary'
    )
  })

  it('applies custom className', () => {
    render(<Progress className="custom-progress" value={0} />)
    const progressBar = screen.getByRole('progressbar')

    expect(progressBar).toHaveClass('custom-progress')
  })

  it('handles different progress values', () => {
    const { rerender } = render(<Progress value={0} />)
    const getIndicator = () => screen.getByRole('progressbar').firstChild as HTMLElement

    // Test 0%
    expect(getIndicator()).toHaveStyle({ transform: 'translateX(-100%)' })

    // Test 50%
    rerender(<Progress value={50} />)
    expect(getIndicator()).toHaveStyle({ transform: 'translateX(-50%)' })

    // Test 100%
    rerender(<Progress value={100} />)
    expect(getIndicator()).toHaveStyle({ transform: 'translateX(-0%)' })
  })

  it('handles undefined value', () => {
    render(<Progress />)
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement

    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
  })

  it('applies indicator styles', () => {
    render(<Progress value={50} />)
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement

    expect(indicator).toHaveClass(
      'h-full',
      'w-full',
      'flex-1',
      'bg-primary',
      'transition-all'
    )
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Progress ref={ref} value={0} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles aria attributes', () => {
    render(<Progress value={75} aria-label="Loading progress" />)
    const progressBar = screen.getByRole('progressbar')

    expect(progressBar).toHaveAttribute('aria-label', 'Loading progress')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
  })
}) 