import { forwardRef, useImperativeHandle } from 'react';
import { useMap } from 'react-leaflet';

const MapFlyTo = forwardRef(({}, ref) => {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    flyToPosition(position, zoom) {
      map.flyTo(position, zoom);
    }
  }));

  return null;
});

export default MapFlyTo;