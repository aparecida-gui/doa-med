import React, { useState } from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

export default function NavDefault() {
  const [anchorElement, setAnchorElement] = useState(null);
  let history = useHistory();

  function logout() {
    localStorage.removeItem('tokenUser');
    return history.push('/login');
  }

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <NavBar>
      <AppBar position="fixed">
        <Toolbar>
          <LogoContainer>DoaMed</LogoContainer>
          <Typography color="inherit">Olá</Typography>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            open={Boolean(anchorElement)}
            onClose={handleClose}
            anchorEl={anchorElement}
          >
            <MenuItem onClick={logout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </NavBar>
  );
}

const LogoContainer = styled.div`
  flex-grow: 1;
`;

const NavBar = styled.nav`
  padding: 5.5rem;
`;