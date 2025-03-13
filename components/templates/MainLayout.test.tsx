import { render, screen } from '@/test/test-utils'
import { MainLayout } from './MainLayout'

jest.mock('@/components/organisms/Header', () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}))

jest.mock('@/components/organisms/Footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer</div>,
}))

describe('MainLayout', () => {
  it('renders children with header and footer', () => {
    render(
      <MainLayout>
        <div data-testid="test-content">Test Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('renders custom header when provided', () => {
    const CustomHeader = () => <div data-testid="custom-header">Custom Header</div>

    render(
      <MainLayout header={<CustomHeader />}>
        <div>Test Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('custom-header')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-header')).not.toBeInTheDocument()
  })

  it('renders custom footer when provided', () => {
    const CustomFooter = () => <div data-testid="custom-footer">Custom Footer</div>

    render(
      <MainLayout footer={<CustomFooter />}>
        <div>Test Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-footer')).not.toBeInTheDocument()
  })
}) 