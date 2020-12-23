import React, { useState } from 'react';
import api from '../services/api';
import InputMask from 'react-input-mask';
import { Redirect } from 'react-router-dom';

export default function RegisterBeneficiary() {
  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');
  let [city, setCity] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [isRegisterOk, setIsRegisterOk] = useState(null);
  let [message, setMessage] = useState('');

  const handleSubmit = async () => {
    let registerUser = null;

    try {
      registerUser = await api.post('register_user', {
        name,
        phone,
        city,
        email,
        password,
      });

      if (registerUser.status === 201) {
        setIsRegisterOk((isRegisterOk = true));
      }
    } catch (error) {
      if (error.response.data.isUserExit.message) {
        setIsRegisterOk((isRegisterOk = false));
        setMessage((message = error.response.data.isUserExit.message));

        getInitialState();
      }
      if (error.response.data.validData.message) {
        setIsRegisterOk((isRegisterOk = false));
        setMessage((message = error.response.data.validData.message));
      }
    }
  };

  const getInitialState = () => (
    setName((name = '')),
    setPhone((phone = '')),
    setCity((city = '')),
    setEmail((email = '')),
    setPassword((password = ''))
  );

  return (
    <>
      <div style={{ paddingTop: ' 4rem' }}>
        {isRegisterOk === true && <div>{<Redirect exact to="/" />}</div>}
        {isRegisterOk === false && (
          <div>
            <h4>{message}</h4>
          </div>
        )}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Cadastro</h1>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone</label>
          <InputMask
            required
            mask="(99) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="phone"
            placeholder="Ex.: (00) 0000-0000"
          />
        </div>

        <div>
          <label htmlFor="city">Cidade</label>
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">
            Cadastrar
          </button>
        </div>
      </form>
    </>
  );
}
