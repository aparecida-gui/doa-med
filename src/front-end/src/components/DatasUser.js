import React from 'react';
import { Button, Typography } from '@material-ui/core';
import '../index.css';

export default function DatasUser({
  index,
  name,
  email,
  phone,
  city,
  title,
  labelButton,
  onClick,
}) {
  return (
    <div className="dataUser">
      <Typography variant="h6">{title}</Typography>
      <p>{index}</p>
      <Typography>Nome: {name}</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>{phone}</Typography>
      <Typography>Cidade: {city}</Typography>
      <Button size="small" color="primary" variant="outlined" onClick={onClick}>
        <Typography>{labelButton}</Typography>
      </Button>
    </div>
  );
}
