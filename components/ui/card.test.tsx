import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    )
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<Card>Card Content</Card>)
    const card = screen.getByText('Card Content')
    
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'shadow-sm')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Card Content</Card>)
    const card = screen.getByText('Card Content')
    
    expect(card).toHaveClass('custom-class')
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(
      <CardHeader>
        <div>Header Content</div>
      </CardHeader>
    )
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<CardHeader>Header Content</CardHeader>)
    const header = screen.getByText('Header Content')
    
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
  })
})

describe('CardTitle', () => {
  it('renders children correctly', () => {
    render(<CardTitle>Card Title</CardTitle>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<CardTitle>Card Title</CardTitle>)
    const title = screen.getByText('Card Title')
    
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
  })
})

describe('CardDescription', () => {
  it('renders children correctly', () => {
    render(<CardDescription>Card Description</CardDescription>)
    expect(screen.getByText('Card Description')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<CardDescription>Card Description</CardDescription>)
    const description = screen.getByText('Card Description')
    
    expect(description).toHaveClass('text-sm', 'text-muted-foreground')
  })
})

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(
      <CardContent>
        <div>Content</div>
      </CardContent>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<CardContent>Content</CardContent>)
    const content = screen.getByText('Content')
    
    expect(content).toHaveClass('p-6', 'pt-0')
  })
})

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(
      <CardFooter>
        <div>Footer Content</div>
      </CardFooter>
    )
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<CardFooter>Footer Content</CardFooter>)
    const footer = screen.getByText('Footer Content')
    
    expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })
})

describe('Card Integration', () => {
  it('renders a complete card with all components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Example Card</CardTitle>
          <CardDescription>This is a card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Example Card')).toBeInTheDocument()
    expect(screen.getByText('This is a card description')).toBeInTheDocument()
    expect(screen.getByText('Main content goes here')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })
}) 