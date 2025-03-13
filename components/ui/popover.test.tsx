import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Popover, PopoverTrigger, PopoverContent } from './popover'

describe('Popover', () => {
  it('renders popover trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    expect(screen.getByText('Open Popover')).toBeInTheDocument()
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('shows popover content on click', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Open Popover')
    await userEvent.click(trigger)

    expect(screen.getByText('Popover content')).toBeInTheDocument()
    expect(screen.getByText('Popover content')).toHaveClass(
      'z-50',
      'w-72',
      'rounded-md',
      'border',
      'bg-popover',
      'p-4',
      'text-popover-foreground',
      'shadow-md',
      'outline-none'
    )
  })

  it('hides popover content on second click', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Open Popover')
    await userEvent.click(trigger)
    expect(screen.getByText('Popover content')).toBeInTheDocument()

    await userEvent.click(trigger)
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('applies custom className to popover content', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent className="custom-popover">Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Open Popover')
    await userEvent.click(trigger)

    expect(screen.getByText('Popover content')).toHaveClass('custom-popover')
  })

  it('applies custom align prop', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent align="start">Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Open Popover')
    await userEvent.click(trigger)

    expect(screen.getByText('Popover content')).toHaveAttribute('data-align', 'start')
  })

  it('applies custom sideOffset prop', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent sideOffset={8}>Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Open Popover')
    await userEvent.click(trigger)

    expect(screen.getByText('Popover content')).toHaveAttribute('data-side-offset', '8')
  })

  it('applies animation classes', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Open Popover')
    await userEvent.click(trigger)

    const content = screen.getByText('Popover content')
    expect(content).toHaveClass(
      'data-[state=open]:animate-in',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95',
      'data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2'
    )
  })
}) 