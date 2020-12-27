import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, Container } from '@material-ui/core';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Container maxWidth="sm">
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
