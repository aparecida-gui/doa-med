import React from 'react';
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
    const { getByTestId, getByText } = render(<RegisterBeneficiary />);

    // preencher os campos do cadastro.
    const inputName = getByTestId('reg-name').querySelector('input');
    const inputPhone = getByTestId('reg-phone').querySelector('input');
    const inputCity = getByTestId('reg-city').querySelector('input');
    const inputEmail = getByTestId('reg-email').querySelector('input');
    const inputPassword = getByTestId('reg-password').querySelector('input');
    const buttonRegister = getByText('Cadastrar');

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
  test('Click button fill input', () => {
    // clicar no botão sem preencher os campos do cadastro.
    // mostrar mensagem de erro.
  });
});
