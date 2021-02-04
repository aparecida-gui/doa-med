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
import { useAuth } from '../contexts/UserContex';

export default function NavDefault() {
  const [anchorElement, setAnchorElement] = useState(null);
  let history = useHistory();
  let { user } = useAuth();

  function logout() {
    localStorage.removeItem('tokenUser');
    return history.push('/');
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
          <Typography color="inherit">Olá, {user.name}</Typography>
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
  padding: 1rem;
`;

const NavBar = styled.nav`
  padding: 6rem;
  font-size: 1.5rem;
`;
