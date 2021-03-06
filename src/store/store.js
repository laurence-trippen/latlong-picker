import create from "zustand";
import { DRAG_MODE } from "../core/modes";
import { v4 as uuidv4 } from 'uuid';
import { mountStoreDevtool } from "simple-zustand-devtools";

export const useStore = create((set) => ({
  selectedMode: DRAG_MODE,
  selectedMarker: null,
  markerPositions: [],
  setMode: (newMode) => set(({ selectedMode: newMode })),
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),
  addMarker: (newMarker) => set((state) => ({
    markerPositions: [
      ...state.markerPositions, 
      {
        ...newMarker,
        uuid: uuidv4(),
      }
    ],
    selectedMarker: null,
  })),
  removeMarker: (position) => set((state) => ({ 
    markerPositions: state.markerPositions.filter(pos => pos.uuid !== position.uuid),
    selectedMarker: null,
  })),
  updateMarker: (updatedPosition) => set((state) => {
    return ({
      markerPositions: state.markerPositions.map((pos) => {
        if (pos.uuid !== updatedPosition.uuid) {
          // This isn't the item we care about - keep it as-is
          return pos;
        }
    
        // Otherwise, this is the one we want - return an updated value
        const updated = {
          ...pos,
          ...updatedPosition,
        };
  
        return updated;
      }),
      selectedMarker: updatedPosition.uuid,
    });
  }),
}));

// TODO: Only in dev-mode
mountStoreDevtool('Store', useStore);
