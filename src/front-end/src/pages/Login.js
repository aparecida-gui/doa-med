import React, { useState } from 'react';
import '../index.css';
import api from '../services/api';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link, useHistory } from 'react-router-dom';
import { AlertError } from '../components/Alert';

function Login() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');
  let [isLogin, setIsLogin] = useState(false);
  let [beneficiaryId, setBeneficiaryId] = useState('');
  let history = useHistory();

  const handleSubmit = async () => {
    let acessoLogin = await api.post('/', {
      email,
      password,
    });

    if (acessoLogin.status === 200) {
      setIsLogin((isLogin = true));
      setBeneficiaryId((beneficiaryId = acessoLogin.data.emailExists.id));
      console.log(
        'email: ',
        email,
        'password: ',
        password,
        'beneficiaryId: ',
        beneficiaryId,
        'message: ',
        message,
        'isLogin: ',
        isLogin
      );
      localStorage.setItem('tokenUser', acessoLogin.data.token);
      return history.push(`${beneficiaryId}/register_medicine_benef`);
    }
  };

  return (
    <>
      {message && <AlertError msg={message} />}

      <Grid
        Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h2>Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item>
            <TextField
              required
              autoFocus
              fullWidth
              label="Emaill"
              type="email"
              style={{ margin: 18 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="form-email"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Senha"
              type="password"
              style={{ margin: 18 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="form-password"
            />
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              type="submit"
              style={{ margin: 5 }}
              onClick={handleSubmit}
              data-testid="form-btn"
            >
              Logar
            </Button>
          </Grid>
          <Grid item>
            <Typography align="right" variant="caption">
              <Link to="/register_user">Faça seu cadastro Aqui</Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </>
  );
}

export default Login;
