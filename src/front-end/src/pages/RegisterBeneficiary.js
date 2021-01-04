import React, { useState } from 'react';
import '../index.css';
import api from '../services/api';
import { Button, Grid, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { AlertError } from '../components/Alert';

export default function RegisterBeneficiary() {
  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');
  let [city, setCity] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [isRegisterOk, setIsRegisterOk] = useState(null);
  let [message, setMessage] = useState('');
  let listaMenssagens = [];

  const validateFields = () => {
    if (name.length < 4) {
      listaMenssagens.push('O campo nome deve ter no minimo 4 caracteres.');
    }
    if (phone.length < 8) {
      listaMenssagens.push('O campo telefone deve ter 8 ou 9 caracteres.');
    }

    if (phone.length > 9) {
      listaMenssagens.push('O campo telefone deve ter 8 ou 9 caracteres.');
    }

    if (city.length < 5) {
      listaMenssagens.push('O campo cidade é pequeno.');
    }
    if (password.length < 6) {
      listaMenssagens.push('O campo senha deve ter no minimo 6 caracteres.');
    }
    if (password.length > 20) {
      listaMenssagens.push(
        'O campo senha é muito grande no maximo são 20 caracteres.'
      );
    }
    if (listaMenssagens.length > 0) {
      return listaMenssagens;
    }
  };

  const handleSubmit = async () => {
    validateFields();
    if (listaMenssagens.length === 0) {
      try {
        let registerUser = await api.post('register_user', {
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
      {isRegisterOk === true && <Redirect exact to="/login" />}
      {isRegisterOk === false && <AlertError msg={message} />}

      <Grid container direction="column" justify="center" alignItems="center">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Cadastro</h2>
          <Grid item>
            <TextField
              required
              autoFocus
              fullWidth
              label="Nome"
              type="text"
              value={name}
              style={{ margin: 18 }}
              onChange={(e) => setName(e.target.value)}
              data-testid="reg-name"
            />
          </Grid>

          <Grid item>
            <TextField
              required
              fullWidth
              label="Telefone"
              type="tel"
              value={phone}
              style={{ margin: 18 }}
              onChange={(e) => setPhone(e.target.value)}
              data-testid="reg-phone"
            />
          </Grid>

          <Grid item>
            <TextField
              required
              fullWidth
              label="Cidade"
              type="text"
              value={city}
              style={{ margin: 18 }}
              onChange={(e) => setCity(e.target.value)}
              data-testid="reg-city"
            />
          </Grid>

          <Grid item>
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              style={{ margin: 18 }}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="reg-email"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Senha"
              type="password"
              value={password}
              style={{ margin: 18 }}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="reg-password"
            />
          </Grid>
          <div>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              type="submit"
              style={{ margin: 5 }}
              onClick={handleSubmit}
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
}
