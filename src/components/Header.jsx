import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

function Header({ onMyLocation }) {
  return (
    <AppBar position="relative" style={{ background: "white", color: blueGrey[600], zIndex: 10000 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LatLong Picker
        </Typography>
        <Button onClick={onMyLocation}>My Location</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header;