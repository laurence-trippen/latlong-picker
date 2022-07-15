import React, { useEffect, useRef } from 'react';

import { 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import { triggerRipple } from '../utils/rippleUtils';

function MapListItem({ position, onCopy, onDelete, onClick, selected = false }) {
  const containerRef = useRef();
  const touchRippleRef = useRef();
  
  useEffect(() => {
    if (selected === true) {
      triggerRipple(containerRef, touchRippleRef);
    }
  });

  return (
    <>
      <ListItem disablePadding ref={containerRef}>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary={`${position.lat} ${position.lng}`} />
          <IconButton color="primary" onClick={(e) => {
            e.stopPropagation();
            onCopy(position.lat, position.lng);
          }}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton color="error" onClick={(e) => {
            e.stopPropagation();
            onDelete(position);
          }}>
            <DeleteOutlineIcon />
          </IconButton>
        </ListItemButton>
        <TouchRipple ref={touchRippleRef} />
      </ListItem>
      <Divider />
    </>
  );
}

export default MapListItem;