import React from 'react';
import { Alert } from '@material-ui/lab';
import '../index.css';

export const AlertError = (props) => {
  return (
    <Alert variant="filled" severity="error">
      <h5 className="tex">{props.msg}</h5>
    </Alert>
  );
};
