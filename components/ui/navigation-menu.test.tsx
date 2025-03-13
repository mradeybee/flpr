import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './navigation-menu'

describe('NavigationMenu', () => {
  it('renders a complete navigation menu', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>Content 1</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/test">Item 2</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('shows content when trigger is clicked', async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>Content 1</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const trigger = screen.getByText('Item 1')
    await userEvent.click(trigger)

    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('applies default styles to navigation menu', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByRole('navigation')).toHaveClass(
      'relative',
      'z-10',
      'flex',
      'max-w-max',
      'flex-1',
      'items-center',
      'justify-center'
    )
  })

  it('applies default styles to navigation menu list', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByRole('list')).toHaveClass(
      'group',
      'flex',
      'flex-1',
      'list-none',
      'items-center',
      'justify-center',
      'space-x-1'
    )
  })

  it('applies trigger styles', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const trigger = screen.getByText('Item 1')
    expect(trigger).toHaveClass(
      'group',
      'inline-flex',
      'h-10',
      'w-max',
      'items-center',
      'justify-center',
      'rounded-md',
      'bg-background',
      'px-4',
      'py-2',
      'text-sm',
      'font-medium'
    )
  })

  it('renders chevron icon in trigger', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const chevron = screen.getByRole('img', { hidden: true })
    expect(chevron).toHaveClass('h-3', 'w-3')
  })

  it('applies custom className to components', () => {
    render(
      <NavigationMenu className="custom-nav">
        <NavigationMenuList className="custom-list">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="custom-trigger">Item 1</NavigationMenuTrigger>
            <NavigationMenuContent className="custom-content">Content 1</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByRole('navigation')).toHaveClass('custom-nav')
    expect(screen.getByRole('list')).toHaveClass('custom-list')
    expect(screen.getByText('Item 1')).toHaveClass('custom-trigger')
  })

  it('handles navigation menu link correctly', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/test">Link Item</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const link = screen.getByText('Link Item')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies animation classes to content', async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>Content 1</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const trigger = screen.getByText('Item 1')
    await userEvent.click(trigger)

    const content = screen.getByText('Content 1')
    expect(content).toHaveClass(
      'data-[motion^=from-]:animate-in',
      'data-[motion^=to-]:animate-out',
      'data-[motion^=from-]:fade-in',
      'data-[motion^=to-]:fade-out'
    )
  })
}) 