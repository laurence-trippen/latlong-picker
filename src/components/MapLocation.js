import { forwardRef, useImperativeHandle } from 'react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapLocation = forwardRef((props, ref) => {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    flyToMyLocation() {
      map.locate().on("locationfound", (e) => {
        map.flyTo(e.latlng, map.getZoom());
      });
    }
  }));

  return null;
});

export default MapLocation;
