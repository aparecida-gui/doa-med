import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import RegisterBeneficiary from '../src/pages/RegisterBeneficiary';

describe('Page register beneficiary', () => {
  const registerUser = {
    name: 'maria',
    phone: '51 9999999',
    city: 'Porto Alegre',
    email: 'teste@email.com',
    password: '1111111',
  };

  test('Insert data with success', () => {
    let { getByTestId, getByText } = render(<RegisterBeneficiary />, {
      wrapper: BrowserRouter,
    });

    let inputName = getByTestId('reg-name').querySelector('input');
    let inputPhone = getByTestId('reg-phone').querySelector('input');
    let inputCity = getByTestId('reg-city').querySelector('input');
    let inputEmail = getByTestId('reg-email').querySelector('input');
    let inputPassword = getByTestId('reg-password').querySelector('input');
    let buttonRegister = getByText('Cadastrar');

    fireEvent.input(inputName, {
      target: { value: 'maria' },
    });

    fireEvent.input(inputPhone, {
      target: { value: '51 9999999' },
    });

    fireEvent.input(inputCity, {
      target: { value: 'Porto Alegre' },
    });

    fireEvent.input(inputEmail, {
      target: { value: 'teste@email.com' },
    });

    fireEvent.input(inputPassword, {
      target: { value: '1111111' },
    });

    fireEvent.click(buttonRegister);

    expect(inputName.value).toEqual(registerUser.name);
    expect(inputPhone.value).toEqual(registerUser.phone);
    expect(inputCity.value).toEqual(registerUser.city);
    expect(inputEmail.value).toEqual(registerUser.email);
    expect(inputPassword.value).toEqual(registerUser.password);
    expect(buttonRegister).toHaveTextContent('Cadastrar');
  });

  //TODO: Testar a validação dos campos.
  test('Validate inputs', () => {
    // clicar no botão sem preencher os campos do cadastro.
    // mostrar mensagem de erro.
  });
});
