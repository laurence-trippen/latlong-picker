import React, { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Box } from '@mui/system';
import MapLocation from '../components/MapLocation';
import Header from '../components/Header';
import { useStore } from '../store/store';
import MapEvents from '../components/MapEvents';
import { Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const drawerWidth = 240;

function MapPage() {
  // State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mockPos, setMockPos] = useState([
    { lat: 5, long: 2 },
    { lat: 5, long: 2 },
    { lat: 5, long: 2 },
  ]);

  // Hooks
  const theme = useTheme();
  console.log('Theme: ', theme);

  // Store
  const markerPositions = useStore((state) => state.markerPositions);
  const removeMarker = useStore((state) => state.removeMarker);

  // Refs
  const mapLocationRef = useRef();

  // Events
  function handleMyLocation() {
    mapLocationRef.current.flyToMyLocation();
  }

  function handleToggleDrawer() {
    setDrawerOpen(state => !state);
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh" }}>
        <Header 
          onMyLocation={handleMyLocation} 
          onMenu={handleToggleDrawer}
          open={drawerOpen} 
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <MapContainer 
              style={{
                height: "100%", 
                flexGrow: 1,
              }}
              className={drawerOpen}
              center={[51.505, -0.09]} 
              zoom={13} 
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>

              {markerPositions.map((position, id) => (
                <Marker key={`marker-${id}`} position={position} draggable={true}>
                  <Popup>
                    <IconButton size='small' onClick={() => removeMarker(position)}>
                      <DeleteIcon />
                    </IconButton>
                  </Popup>
                </Marker>
              ))}

              <MapLocation ref={mapLocationRef} zoom={10} />
              <MapEvents />
            </MapContainer>
            <Drawer
              variant="permanent"
              anchor="right"
              open={drawerOpen}
              sx={{
                width: drawerWidth,
                position: "relative",
                overflow: "hidden",
                marginLeft: "auto",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  position: "absolute",
                  boxSizing: 'border-box',
                },
              }}
            >
              {mockPos.map((pos, id) => (
                <>
                  <ListItem key={id}>
                    <ListItemIcon>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${pos.lat} ${pos.long}`} />
                  </ListItem>
                  <Divider />
                </>
              ))}
            </Drawer>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MapPage;
