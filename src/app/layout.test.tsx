import { render, screen } from '@testing-library/react';
import React from 'react';

import RootLayout from './layout'; // Adjust the import path as needed

// Mock the dependencies
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: 'mock-font-class'
  })
}));

jest.mock('@/components/providers/MainProvider', () => ({
  MainProvider: ({ children }) => <div data-testid="main-provider">{children}</div>
}));

jest.mock('@/components/templates/MainLayout', () => ({
  MainLayout: ({ children }) => <div data-testid="main-layout">{children}</div>
}));

jest.mock('@/lib/utils', () => ({
  cn: (...args) => args.join(' ')
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn()
    };
  }
}));

describe('RootLayout', () => {
  it('renders without crashing', () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders the MainProvider', () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByTestId('main-provider')).toBeInTheDocument();
  });

  it('renders the MainLayout', () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });

  it('renders body layout', () => {
    render(<RootLayout>Test Content</RootLayout>);
    const body = document.body;
    expect(body).toBeTruthy();
  });
});