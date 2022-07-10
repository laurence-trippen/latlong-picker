import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Box } from '@mui/system';
import MapLocation from '../components/MapLocation';
import Header from '../components/Header';
import { useStore } from '../store/store';

function MapPage() {
  const selectedMode = useStore((state) => state.selectedMode);
  const mapLocationRef = useRef(); 

  function handleMyLocation() {
    mapLocationRef.current.flyToMyLocation();
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh" }}>
      <Header onMyLocation={handleMyLocation} />
      <Box sx={{ flexGrow: 1 }}>
        <MapContainer style={{ height: "100%" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <MapLocation ref={mapLocationRef} zoom={10} />
        </MapContainer>
      </Box>
    </Box>
  );
}

export default MapPage;
