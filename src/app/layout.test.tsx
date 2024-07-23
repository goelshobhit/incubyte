import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from './layout'; // Adjust the import path as needed

// Mock the dependencies
jest.mock('@/components/providers/MainProvider', () => ({
  MainProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-provider">{children}</div>
  )
}));

jest.mock('@/components/templates/MainLayout', () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  )
}));

jest.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.join(' ')
}));

describe('RootLayout', () => {
  it('renders without crashing', () => {
    render(<RootLayout>Test Content</RootLayout>);
  });

  it('renders the MainProvider', () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByTestId('main-provider')).toBeTruthy();
  });

  it('renders the MainLayout', () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByTestId('main-layout')).toBeTruthy();
  });

  it('renders the children content', () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByText('Test Content')).toBeTruthy();
  });
});
