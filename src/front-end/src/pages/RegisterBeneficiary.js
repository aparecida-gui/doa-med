import React, { useState } from 'react';
import '../index.css';
import api from '../services/api';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { AlertError } from '../components/Alert';

const validate = (name, phone, city, password) => {
  const errors = {};

  if (name.length < 5) {
    errors.name = 'O seu nome deve ter no minino 5 caracteres.';
  }
  if (phone.length < 8 || phone.length > 9) {
    errors.phone = 'Números de telefone tem entre 8 e 9 digitos.';
  }
  if (city.length < 5) {
    errors.city = 'O campo cidade aceita no minimo 5 caracteres.';
  }
  if (password.length < 6) {
    errors.password = 'A sua senha deve ter no minimo 6 caracteres.';
  }
  if (errors !== {}) {
    return errors;
  }
};

export default function RegisterBeneficiary() {
  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');
  let [city, setCity] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [isRegisterOk, setIsRegisterOk] = useState(null);
  let [message, setMessage] = useState('');
  let [validateInputs, setValidateInputs] = useState({});

  const handleSubmit = async () => {
    let validateInput = validate(name, phone, city, password);

    if (Object.entries(validateInput).length === 0) {
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
    } else {
      setValidateInputs(validateInput);
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
      {isRegisterOk === true && <Redirect exact to="/" />}
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
            {validateInputs.name !== undefined && (
              <span>{validateInputs.name}</span>
            )}
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
            {validateInputs.phone !== undefined && (
              <span>{validateInputs.phone}</span>
            )}
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
            {validateInputs.city !== undefined && (
              <span>{validateInputs.city}</span>
            )}
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
            {validateInputs.password !== undefined && (
              <span>{validateInputs.password}</span>
            )}
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
          <Grid item>
            <Typography align="right" variant="caption">
              <Link to="/">Faça seu Login aqui</Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
