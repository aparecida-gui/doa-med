import React from 'react';
import { Button, TextField } from '@material-ui/core';

export const ButtonImage = (props) => (
  <Button variant="contained" component="label">
    Click aqui para adicionar seu receituário medico
    <TextField
      required
      type="file"
      placeholder="Adicione sua Receita"
      style={{ padding: '1rem', display: 'none' }}
      onChange={props.onChange}
    />
  </Button>
);

export const PreviewImage = (props) => (
  <img
    style={{
      paddingLeft: '0.8rem',
      paddingTop: '2rem',
      width: '50%',
      height: 'auto',
    }}
    src={props.src}
  />
);
