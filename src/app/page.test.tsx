import { render, screen } from '@/tests/test-utils';

import { MainProvider } from '@/components/providers/MainProvider';
import HomePage from './page';
import { StringCalculator } from '@/components/StringCalculator'; 

describe('MainProvider', () => {
  it('should render the children components', () => {
    render(
      <MainProvider pageProps={{}}>
        <h1>MainLayout children</h1>
      </MainProvider>
    );

    // Assert
    screen.getByRole('heading', { name: /MainLayout children/i });
  });

  it('renders without crashing', () => {
    render(<HomePage />);
  });

  it('displays the title correctly', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Next.js Enterprise Boilerplate')).toBeInTheDocument();
  });

  it('displays the description correctly', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, React Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.')).toBeInTheDocument();
  });

  it('verifies styling and classes for features', () => {
    const { getAllByRole } = render(<HomePage />);
    const featureItems = getAllByRole('listitem');
    
    featureItems.forEach(item => {
      expect(item).toHaveClass('flex');
      expect(item).toHaveClass('text-center');
      expect(item).toHaveClass('hover:scale-105');
      // Add more assertions for other classes as needed
    });
  });
});

describe('Component Imports', () => {
  it('imports HomePage component correctly', () => {
    expect(HomePage).toBeDefined();
  });

  it('imports StringCalculator component correctly', () => {
    expect(StringCalculator).toBeDefined();
  });
});

describe('Component Rendering', () => {
  it('renders HomePage without crashing', () => {
    render(<HomePage />);
  });

  it('renders StringCalculator without crashing', () => {
    render(<StringCalculator />);
  });
});
