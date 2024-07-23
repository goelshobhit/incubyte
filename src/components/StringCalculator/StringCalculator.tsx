import { ReactNode } from 'react';

type ExampleProps = {
  children?: ReactNode;
};

export const StringCalculator = ({ children }: ExampleProps) => (
  <div>
    <h1>String Calculator</h1>
  </div>
);
