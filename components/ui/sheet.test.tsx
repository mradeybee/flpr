import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './sheet'

describe('Sheet', () => {
  it('renders a complete sheet with all components', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>This is a sheet description.</SheetDescription>
          </SheetHeader>
          <div>Sheet content goes here</div>
          <SheetFooter>
            <SheetClose>Close Sheet</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )

    // Check trigger button
    const trigger = screen.getByText('Open Sheet')
    expect(trigger).toBeInTheDocument()

    // Open sheet
    await userEvent.click(trigger)

    // Check sheet content
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Sheet Title')).toBeInTheDocument()
    expect(screen.getByText('This is a sheet description.')).toBeInTheDocument()
    expect(screen.getByText('Sheet content goes here')).toBeInTheDocument()
    expect(screen.getByText('Close Sheet')).toBeInTheDocument()
  })

  it('closes when clicking the close button', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetClose>Close Sheet</SheetClose>
        </SheetContent>
      </Sheet>
    )

    // Open sheet
    await userEvent.click(screen.getByText('Open Sheet'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close sheet
    await userEvent.click(screen.getByText('Close Sheet'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when clicking the X button', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    // Open sheet
    await userEvent.click(screen.getByText('Open Sheet'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close sheet using X button
    await userEvent.click(screen.getByLabelText('Close'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('applies side variants correctly', async () => {
    const { rerender } = render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent side="right">Content</SheetContent>
      </Sheet>
    )

    await userEvent.click(screen.getByText('Open Sheet'))
    expect(screen.getByRole('dialog')).toHaveClass(
      'inset-y-0',
      'right-0',
      'h-full',
      'w-3/4',
      'border-l'
    )

    // Test left side
    rerender(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent side="left">Content</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog')).toHaveClass(
      'inset-y-0',
      'left-0',
      'h-full',
      'w-3/4',
      'border-r'
    )

    // Test top side
    rerender(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent side="top">Content</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog')).toHaveClass(
      'inset-x-0',
      'top-0',
      'border-b'
    )

    // Test bottom side
    rerender(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent side="bottom">Content</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog')).toHaveClass(
      'inset-x-0',
      'bottom-0',
      'border-t'
    )
  })

  it('applies custom className to components', async () => {
    render(
      <Sheet>
        <SheetTrigger className="custom-trigger">Open Sheet</SheetTrigger>
        <SheetContent className="custom-content">
          <SheetHeader className="custom-header">
            <SheetTitle className="custom-title">Sheet Title</SheetTitle>
            <SheetDescription className="custom-description">Description</SheetDescription>
          </SheetHeader>
          <SheetFooter className="custom-footer">
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )

    const trigger = screen.getByText('Open Sheet')
    expect(trigger).toHaveClass('custom-trigger')

    await userEvent.click(trigger)

    expect(screen.getByRole('dialog')).toHaveClass('custom-content')
    expect(screen.getByText('Sheet Title').parentElement).toHaveClass('custom-header')
    expect(screen.getByText('Sheet Title')).toHaveClass('custom-title')
    expect(screen.getByText('Description')).toHaveClass('custom-description')
    expect(screen.getByText('Close').parentElement).toHaveClass('custom-footer')
  })

  it('renders header with default styles', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )

    await userEvent.click(screen.getByText('Open Sheet'))

    const header = screen.getByText('Sheet Title').parentElement
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-2', 'text-center', 'sm:text-left')
  })

  it('renders footer with default styles', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetFooter>
            <button>Action</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )

    await userEvent.click(screen.getByText('Open Sheet'))

    const footer = screen.getByText('Action').parentElement
    expect(footer).toHaveClass(
      'flex',
      'flex-col-reverse',
      'sm:flex-row',
      'sm:justify-end',
      'sm:space-x-2'
    )
  })
}) 