import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../../png/logo-no-background.png';
import { clearUser } from '../../redux/slice/userSlice'// Import logout action
import { useAuth } from '../Auth/AuthContext';

const NavBar = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate()
 const { logout } = useAuth(); 
  const handleLogout = () => {
    dispatch(clearUser());
    logout() 
    navigate('/')
  };

  return (
    <AppBar position="static" sx={{ height: '80px', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: '100%', justifyContent: 'space-between', marginLeft: '100px', marginRight: '100px' }}>
          {/* Logo in the top-left corner */}
          <div>
            <img alt="logo" src={logo} style={{ height: '50px', width: 'auto' }} />
          </div>

          {/* Navigation items centered */}
          <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
            <Toolbar className="nav-items" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flex: 1, gap: '10px' }}>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/stock" color="inherit">
                Stock
              </Button>
              <Button component={Link} to="/news" color="inherit">
                News
              </Button>
              <Button component={Link} to="/crypto" color="inherit">
                Crypto
              </Button>
              <Button component={Link} to="/chat" color="inherit">
                Chat
              </Button>
            </Toolbar>
          </div>

          {/* Logout button */}
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
