// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static"  className="header">
      <Toolbar>
        <Typography variant="h6" component="div" >
          Clínica Dental MUR
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;