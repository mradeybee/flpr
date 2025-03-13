import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant styles correctly', () => {
    render(
      <>
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </>
    )

    const defaultButton = screen.getByText('Default')
    const destructiveButton = screen.getByText('Destructive')
    const outlineButton = screen.getByText('Outline')
    const secondaryButton = screen.getByText('Secondary')
    const ghostButton = screen.getByText('Ghost')
    const linkButton = screen.getByText('Link')

    expect(defaultButton).toHaveClass('bg-primary')
    expect(destructiveButton).toHaveClass('bg-destructive')
    expect(outlineButton).toHaveClass('border')
    expect(secondaryButton).toHaveClass('bg-secondary')
    expect(ghostButton).toHaveClass('hover:bg-accent')
    expect(linkButton).toHaveClass('text-primary')
  })

  it('applies size styles correctly', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">Icon</Button>
      </>
    )

    const smallButton = screen.getByText('Small')
    const defaultButton = screen.getByText('Default')
    const largeButton = screen.getByText('Large')
    const iconButton = screen.getByText('Icon')

    expect(smallButton).toHaveClass('h-9')
    expect(defaultButton).toHaveClass('h-10')
    expect(largeButton).toHaveClass('h-11')
    expect(iconButton).toHaveClass('h-10 w-10')
  })

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none disabled:opacity-50')
  })

  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )

    const linkButton = screen.getByText('Link Button')
    expect(linkButton.tagName).toBe('A')
    expect(linkButton).toHaveAttribute('href', '/test')
  })
}) 