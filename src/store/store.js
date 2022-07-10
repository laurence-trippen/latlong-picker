import create from "zustand";
import { DRAG_MODE } from "../core/modes";

export const useStore = create((set) => ({
  selectedMode: DRAG_MODE,
  setMode: (newMode) => set(({ selectedMode: newMode })),
}));
