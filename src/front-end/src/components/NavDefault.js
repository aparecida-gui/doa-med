import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AccountCircle } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/UserContex';
import '../index.css';
import api from '../services/api';

export default function NavDefault() {
  let [anchorElement, setAnchorElement] = useState(null);
  let [count, setCount] = useState(0);
  const history = useHistory();
  const { user } = useAuth();
  let notifications = [];

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

  useEffect(() => {
    async function testeNotification() {
      try {
        let notification = await api.get(`/have_donation/${user.id}`);

        notifications.push(notification.data);
        setCount(count + notifications.length);
      } catch (error) {
        console.log(error);
      }
    }
    testeNotification();
  }, []);

  return (
    <NavBar>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/home" className="menuOptions">
            DoaMed
          </Link>
          <Link to="/home" className="menuOptions">
            Home
          </Link>
          <Link
            to={`/view_medicine_register/${user.id}`}
            className="menuOptions"
          >
            Seus Medicamentos Cadastrados
          </Link>
          <IconButton color="inherit">
            <Badge badgeContent={count} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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

const NavBar = styled.nav`
  padding: 6rem;
  font-size: 1.5rem;
`;
