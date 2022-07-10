import create from "zustand";
import { DRAG_MODE } from "../core/modes";

export const useStore = create((set) => ({
  selectedMode: DRAG_MODE,
  markerPositions: [],
  setMode: (newMode) => set(({ selectedMode: newMode })),
  addMarker: (newMarker) => set((state) => ({ markerPositions: [...state.markerPositions, newMarker] })),
}));
