import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './tooltip'

describe('Tooltip', () => {
  it('renders tooltip trigger', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByText('Hover me')).toBeInTheDocument()
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })

  it('shows tooltip content on hover', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)

    expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    expect(screen.getByText('Tooltip content')).toHaveClass(
      'z-50',
      'overflow-hidden',
      'rounded-md',
      'border',
      'bg-popover',
      'px-3',
      'py-1.5',
      'text-sm',
      'text-popover-foreground',
      'shadow-md'
    )
  })

  it('hides tooltip content on unhover', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)
    expect(screen.getByText('Tooltip content')).toBeInTheDocument()

    await userEvent.unhover(trigger)
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })

  it('applies custom className to tooltip content', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent className="custom-tooltip">Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)

    expect(screen.getByText('Tooltip content')).toHaveClass('custom-tooltip')
  })

  it('applies custom sideOffset', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent sideOffset={8}>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)

    const tooltip = screen.getByText('Tooltip content')
    expect(tooltip).toHaveAttribute('data-side-offset', '8')
  })

  it('applies animation classes', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await userEvent.hover(trigger)

    const tooltip = screen.getByText('Tooltip content')
    expect(tooltip).toHaveClass(
      'animate-in',
      'fade-in-0',
      'zoom-in-95',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2'
    )
  })
}) 