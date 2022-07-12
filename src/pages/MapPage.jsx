import React, { useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Box } from '@mui/system';
import MapLocation from '../components/MapLocation';
import Header from '../components/Header';
import { useStore } from '../store/store';
import MapEvents from '../components/MapEvents';
import { Divider, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const drawerWidth = 280;

function MapPage() {
  // State
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Store
  const markerPositions = useStore((state) => state.markerPositions);
  const removeMarker = useStore((state) => state.removeMarker);
  const updateMarker = useStore((state) => state.updateMarker);

  console.log('Pos: ', markerPositions);

  // Refs
  const mapLocationRef = useRef();

  // Events
  function handleMyLocation() {
    mapLocationRef.current.flyToMyLocation();
  }

  function handleToggleDrawer() {
    setDrawerOpen(state => !state);
  }

  const markerEventHandlers = useMemo(() => ({
    /*
    mousedown(e) {
      console.log('Mouse Down', e.sourceTarget.options.alt);
    },
    click(e) {
      console.log('Click: ', e.target.getLatLng());
    },
    dragstart(e) {
      console.log('Dragstart: ', e);
    },
    drag(e) {
      console.log('Drag: ', e);
    },
    dragend(e) {
      console.log('Dragend: ', e);
    },
    movestart(e) {
      console.log('Movestart: ', e);
    },
    move(e) {
      console.log('Move: ', e);
    },
    */
    moveend(e) {
      const uuid = e.sourceTarget.options.alt;
      const { lat, lng } = e.target.getLatLng();

      updateMarker({
        uuid,
        lat,
        lng,
      });
    },
  }), []);

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
              center={[51.505, -0.09]} 
              zoom={13} 
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {markerPositions.map((position) => (
                <Marker 
                  key={position.uuid} 
                  position={position} 
                  draggable={true} 
                  eventHandlers={markerEventHandlers} 
                  alt={position.uuid}
                >
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
              {markerPositions.length === 0 
                ? <Box sx={{ 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center",
                      height: "100%"
                    }}
                  >
                    <Typography>No Markers placed</Typography>
                  </Box>
                : markerPositions.map((pos, id) => (
                <React.Fragment key={id}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${pos.lat} ${pos.lng}`} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </Drawer>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MapPage;
