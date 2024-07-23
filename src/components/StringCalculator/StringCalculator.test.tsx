import { render, screen } from '@testing-library/react';
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

  it('should handle minimum and maximum values', async () => {
    render(<StringCalculator />);
    const number1Input = screen.getByLabelText('Number 1');

    await userEvent.type(number1Input, '-9999999999999999');
    expect(number1Input).toHaveValue(-9999999999999999);

    await userEvent.clear(number1Input);
    await userEvent.type(number1Input, '9999999999999999');
    expect(number1Input).toHaveValue(9999999999999999);
  });
});
