/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import Login from '../src/pages/Login.js';

describe('tests the login screen.', () => {
  test('Filling in email, password and button click', () => {
    let { getByTestId, getByText } = render(<Login />, {
      wrapper: BrowserRouter,
    });

    const inputEmail = getByTestId('form-email').querySelector('input');

    const inputPassword = getByTestId('form-password').querySelector('input');

    const buttonLogin = getByText('Logar');

    fireEvent.change(inputEmail, {
      target: { value: 'maria@email.com' },
    });

    fireEvent.change(inputPassword, {
      target: { value: '1234567' },
    });

    expect(fireEvent.click(buttonLogin)).toBe(true);
  });
});
