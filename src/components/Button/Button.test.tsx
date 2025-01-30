import { Button } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

test('renders Button with label', () => {
  render(<Button onClick={() => {}}>Click me</Button>);
  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});

test('calls onClick when clicked', async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick} >Click me</Button>);

  const button = screen.getByText(/click me/i);
  await userEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
