import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PanToolIcon from '@mui/icons-material/PanTool';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { AppBar, Button, IconButton, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { ADD_MODE, DRAG_MODE } from '../core/modes';
import { useStore } from '../store/store';

function Header({ onMyLocation, onMenu, open }) {
  const selectedMode = useStore((state) => state.selectedMode);
  const setMode = useStore((state) => state.setMode);

  const handleOnChangeMode = (e, newMode) => setMode(newMode);

  return (
    <AppBar position="relative" open={open} style={{ background: "white", color: blueGrey[600], zIndex: 10000 }}>
      <Toolbar>
        <IconButton
          onClick={onMenu}
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
          value={selectedMode} 
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