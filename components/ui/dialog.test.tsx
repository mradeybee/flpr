import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog'

describe('Dialog', () => {
  it('renders a complete dialog with all components', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a dialog description.</DialogDescription>
          </DialogHeader>
          <div>Dialog content goes here</div>
          <DialogFooter>
            <DialogClose>Close Dialog</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    // Check trigger button
    const trigger = screen.getByText('Open Dialog')
    expect(trigger).toBeInTheDocument()

    // Open dialog
    await userEvent.click(trigger)

    // Check dialog content
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
    expect(screen.getByText('This is a dialog description.')).toBeInTheDocument()
    expect(screen.getByText('Dialog content goes here')).toBeInTheDocument()
    expect(screen.getByText('Close Dialog')).toBeInTheDocument()
  })

  it('closes when clicking the close button', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogClose>Close Dialog</DialogClose>
        </DialogContent>
      </Dialog>
    )

    // Open dialog
    await userEvent.click(screen.getByText('Open Dialog'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close dialog
    await userEvent.click(screen.getByText('Close Dialog'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when clicking the X button', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    // Open dialog
    await userEvent.click(screen.getByText('Open Dialog'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close dialog using X button
    await userEvent.click(screen.getByLabelText('Close'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('applies custom className to components', async () => {
    render(
      <Dialog>
        <DialogTrigger className="custom-trigger">Open Dialog</DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Dialog Title</DialogTitle>
            <DialogDescription className="custom-description">Description</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer">
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    const trigger = screen.getByText('Open Dialog')
    expect(trigger).toHaveClass('custom-trigger')

    await userEvent.click(trigger)

    expect(screen.getByRole('dialog')).toHaveClass('custom-content')
    expect(screen.getByText('Dialog Title').parentElement).toHaveClass('custom-header')
    expect(screen.getByText('Dialog Title')).toHaveClass('custom-title')
    expect(screen.getByText('Description')).toHaveClass('custom-description')
    expect(screen.getByText('Close').parentElement).toHaveClass('custom-footer')
  })

  it('renders header with default styles', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    await userEvent.click(screen.getByText('Open Dialog'))

    const header = screen.getByText('Dialog Title').parentElement
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'text-center', 'sm:text-left')
  })

  it('renders footer with default styles', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogFooter>
            <button>Action</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    await userEvent.click(screen.getByText('Open Dialog'))

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