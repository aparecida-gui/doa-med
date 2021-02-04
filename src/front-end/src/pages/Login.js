import React, { useState } from 'react';
import '../index.css';
import api from '../services/api';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AlertError } from '../components/Alert';
import { useAuth } from '../contexts/UserContex';

function Login() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message] = useState('');

  let history = useHistory();
  let { setUser } = useAuth();
  let userData = {};

  const checksUser = async () => {
    let loginAccess = await api.post('/', {
      email,
      password,
    });

    if (loginAccess.status === 200) {
      for (let column in loginAccess.data) {
        userData = loginAccess.data[column];
      }
      await setUser(userData);
      return loginAccess;
    } else {
      console.log('Acesso negado.', loginAccess);
    }
  };

  const generateToken = async () => {
    let loginAccess = await checksUser();
    localStorage.setItem('tokenUser', loginAccess.data.token);
    if (localStorage) {
      history.push(`register_medicine/${userData.id}`);
    }
  };

  return (
    <>
      {message && <AlertError msg={message} />}

      <Grid direction="column" alignItems="center">
        <form onSubmit={(e) => e.preventDefault()} className="main login">
          <h2>Login</h2>
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
              onClick={generateToken}
              data-testid="form-btn"
              style={{ margin: 12 }}
            >
              Logar
            </Button>
          </Grid>
          <Grid item>
            <Typography align="right" variant="caption">
              <Link className="adjustItem" to="/register_user">
                Faça seu cadastro Aqui
              </Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </>
  );
}

export default Login;
