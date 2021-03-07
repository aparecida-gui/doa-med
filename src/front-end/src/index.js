import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, Container } from '@material-ui/core';
import { AuthProvider } from './contexts/UserContex';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Container maxWidth="md">
      <AuthProvider>
        <App />
      </AuthProvider>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
