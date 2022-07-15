import React from 'react';

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

function MapListItem({ position, onCopy, onDelete, onClick }) {
  return (
    <>
      <ListItem disablePadding>
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
      </ListItem>
      <Divider />
    </>
  );
}

export default MapListItem;