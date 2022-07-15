import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapSearch() {
  const map = useMap();

  /*
  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });
  */

  const searchControl = new GeoSearchControl({
    style: 'bar',
    showMarker: false,
    provider: new OpenStreetMapProvider(),
  });

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

export default MapSearch;