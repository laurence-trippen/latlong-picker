import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Box } from '@mui/system';
import MapLocation from '../components/MapLocation';
import Header from '../components/Header';
import { useStore } from '../store/store';
import MapEvents from '../components/MapEvents';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function MapPage() {
  // Store
  const markerPositions = useStore((state) => state.markerPositions);
  const removeMarker = useStore((state) => state.removeMarker);

  // Refs
  const mapLocationRef = useRef();

  // Events
  function handleMyLocation() {
    mapLocationRef.current.flyToMyLocation();
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh" }}>
      <Header onMyLocation={handleMyLocation} />
      <Box sx={{ flexGrow: 1 }}>
        <MapContainer 
          style={{ height: "100%" }} 
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
      </Box>
    </Box>
  );
}

export default MapPage;
