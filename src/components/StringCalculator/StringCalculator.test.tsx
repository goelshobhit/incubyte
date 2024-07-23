import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StringCalculator } from './StringCalculator';

describe('Example', () => {
  it('should render the heading', () => {
    render(<StringCalculator>String Calculator</StringCalculator>);

    // Assert
    screen.getByRole('heading', { name: /String Calculator/i });
  });
});

describe('Input validation', () => {
  it('should accept valid numbers', async () => {
    render(<StringCalculator />);
    const number1Input = screen.getByLabelText('Number 1');
    const number2Input = screen.getByLabelText('Number 2');

    await userEvent.type(number1Input, '10');
    await userEvent.type(number2Input, '20');

    expect(number1Input).toHaveValue(10);
    expect(number2Input).toHaveValue(20);
  });

  it('should not accept non-numeric input', async () => {
    render(<StringCalculator />);
    const number1Input = screen.getByLabelText('Number 1');

    await userEvent.type(number1Input, 'abc');

    expect(number1Input).toHaveValue(null);
  });

  it('should handle minimum and maximum safe integer values', async () => {
    render(<StringCalculator />);
    const number1Input = screen.getByLabelText('Number 1');

    // Test minimum safe integer
    await userEvent.type(number1Input, String(Number.MIN_SAFE_INTEGER));
    expect(number1Input).toHaveValue(Number.MIN_SAFE_INTEGER);

    await userEvent.clear(number1Input);

    // Test maximum safe integer
    await userEvent.type(number1Input, String(Number.MAX_SAFE_INTEGER));
    expect(number1Input).toHaveValue(Number.MAX_SAFE_INTEGER);
  });

  it('should handle values beyond safe integer range', async () => {
    render(<StringCalculator />);
    const number1Input = screen.getByLabelText('Number 1');

    // Test a value slightly beyond MAX_SAFE_INTEGER
    await userEvent.type(number1Input, '9007199254740992'); // 2^53
    expect(number1Input).toHaveValue(9007199254740992);

    await userEvent.clear(number1Input);

    // Test a value slightly beyond MIN_SAFE_INTEGER
    await userEvent.type(number1Input, '-9007199254740992'); // -2^53
    expect(number1Input).toHaveValue(-9007199254740992);
  });
});

describe('Error handling', () => {
  it('should show error for empty fields', async () => {
    render(<StringCalculator />);
    const submitButton = screen.getByText('Calculate Sum');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('This field is required')).toHaveLength(2);
    });
  });
});

describe('Form submission', () => {
  it('should calculate sum correctly', async () => {
    render(<StringCalculator />);
    const number1Input = screen.getByLabelText('Number 1');
    const number2Input = screen.getByLabelText('Number 2');
    const submitButton = screen.getByText('Calculate Sum');

    await userEvent.type(number1Input, '10');
    await userEvent.type(number2Input, '20');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('The sum is: 30')).toBeInTheDocument();
    });
  });

  it('should handle negative numbers', async () => {
    render(<StringCalculator />);
    const number1Input = screen.getByLabelText('Number 1');
    const number2Input = screen.getByLabelText('Number 2');
    const submitButton = screen.getByText('Calculate Sum');

    await userEvent.type(number1Input, '-10');
    await userEvent.type(number2Input, '20');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('The sum is: 10')).toBeInTheDocument();
    });
  });
});

describe('Component rendering', () => {
  it('should render the calculator form', () => {
    render(<StringCalculator />);

    expect(screen.getByText('String Calculator')).toBeInTheDocument();
    expect(screen.getByText('Number Sum Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument();
    expect(screen.getByText('Calculate Sum')).toBeInTheDocument();
  });
});
