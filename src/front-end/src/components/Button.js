import React from 'react';
import { Button } from '@material-ui/core';

const SimpleButton = (props) => (
  <Button
    type="submit"
    fullWidth
    variant="outlined"
    color="primary"
    style={{ margin: 18 }}
    onClick={props.onClick}
  >
    {props.label}
  </Button>
);

export default SimpleButton;
