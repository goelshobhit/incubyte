import { render, screen } from '@/tests/test-utils';

import { StringCalculator } from '.';

describe('Example', () => {
  it('should render the heading', () => {
    render(<StringCalculator>String Calculator</StringCalculator>);

    // Assert
    screen.getByRole('heading', { name: /String Calculator/i });
  });
});
