import * as React from 'react'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './select'

describe('Select', () => {
  it('renders a complete select with all components', async () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectSeparator />
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Open select
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // Check content
    const items = screen.getAllByRole('option')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Apple')
    expect(items[1]).toHaveTextContent('Banana')
    expect(items[2]).toHaveTextContent('Orange')

    // Check label
    expect(screen.getByText('Fruits')).toBeInTheDocument()

    // Check separator
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('handles selection changes', async () => {
    const handleValueChange = jest.fn()

    render(
      <Select onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    )

    // Open select
    await userEvent.click(screen.getByRole('combobox'))

    // Select an item
    await userEvent.click(screen.getByText('Banana'))
    expect(handleValueChange).toHaveBeenCalledWith('banana')
  })

  it('applies disabled state correctly', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
    expect(trigger).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('renders disabled items correctly', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple" disabled>Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    userEvent.click(trigger)

    const disabledItem = screen.getByText('Apple').closest('[role="option"]')
    expect(disabledItem).toHaveAttribute('data-disabled')
    expect(disabledItem).toHaveClass('data-[disabled]:pointer-events-none', 'data-[disabled]:opacity-50')
  })

  it('applies custom className to components', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent className="custom-content">
          <SelectItem value="apple" className="custom-item">Apple</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('custom-trigger')

    userEvent.click(trigger)

    const item = screen.getByText('Apple').closest('[role="option"]')
    expect(item).toHaveClass('custom-item')
  })
}) 