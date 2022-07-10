import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PanToolIcon from '@mui/icons-material/PanTool';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { AppBar, Button, IconButton, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const DRAG_MODE = "drag";
const ADD_MODE = "add";

function Header({ onMyLocation }) {
  const [mode, setMode] = useState(DRAG_MODE);

  const handleOnChangeMode = (e, newMode) => setMode(newMode);

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
        <Typography variant="h6" component="div">
          LatLong Picker
        </Typography>
        <ToggleButtonGroup 
          value={mode} 
          size="small" 
          exclusive 
          onChange={handleOnChangeMode}
          sx={{ marginLeft: "3rem" }}
        >
          <ToggleButton value={DRAG_MODE}>
            <PanToolIcon />
          </ToggleButton>
          <ToggleButton value={ADD_MODE}>
            <AddLocationAltIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        
        <div style={{ marginLeft: "auto" }}>
          <Button onClick={onMyLocation}>My Location</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;