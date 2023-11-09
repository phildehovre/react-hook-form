import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import { user } from '@testing-library/user-event';
import React from 'react';
import YupForm from '../YupForm';

function addition(a: number, b: number) {
  return a + b;
}

test('addition', () => {
  expect(addition(1, 2)).toBe(3);
});

test('calls the onSubmit function when the form is submitted', () => {
  const onSubmit = jest.fn();
  render(<YupForm onSubmit={onSubmit} />);

  user.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledTimes(1);
});
