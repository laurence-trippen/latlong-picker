import { forwardRef, useImperativeHandle } from 'react';
import { useMap } from 'react-leaflet';

const MapLocation = forwardRef(({ zoom }, ref) => {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    flyToMyLocation() {
      map.locate().on("locationfound", (e) => {
        map.flyTo(e.latlng, zoom);
      });
    }
  }));

  return null;
});

export default MapLocation;
