import React from 'react';
import { Alert } from '@material-ui/lab';

export const AlertError = (props) => {
  return (
    <Alert variant="filled" severity="error">
      <h6>{props.msg}</h6>
    </Alert>
  );
};
