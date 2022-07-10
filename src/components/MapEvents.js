import { useMapEvents } from "react-leaflet";
import { ADD_MODE } from "../core/modes";
import { useStore } from "../store/store";

function MapEvents() {
  // Store
  const addMarker = useStore((state) => state.addMarker);
  const selectedMode = useStore((state) => state.selectedMode);

  const map = useMapEvents({
    click(e) {
      if (selectedMode === ADD_MODE) {
        addMarker(e.latlng);
      }
    }
  });

  return null;
}

export default MapEvents;