import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Label } from './label'

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<Label>Test Label</Label>)
    const label = screen.getByText('Test Label')
    
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none')
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Test Label</Label>)
    const label = screen.getByText('Test Label')
    
    expect(label).toHaveClass('custom-class')
  })

  it('handles htmlFor attribute', () => {
    render(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" />
      </>
    )
    const label = screen.getByText('Test Label')
    
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Label onClick={handleClick}>Test Label</Label>)
    
    await userEvent.click(screen.getByText('Test Label'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Test Label</Label>)
    
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('applies disabled styles when associated input is disabled', () => {
    render(
      <div>
        <Label htmlFor="disabled-input">Disabled Label</Label>
        <input id="disabled-input" disabled className="peer" />
      </div>
    )
    const label = screen.getByText('Disabled Label')
    
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-70')
  })
}) 