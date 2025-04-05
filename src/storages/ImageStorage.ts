import { create } from "zustand";
import { Size } from "@/types/types";

const MAX_HISTORY_SIZE = 4;

type ImageStorage = {
  format: string | null;
  currentHistoryIndex: number;
  history: Uint8ClampedArray[];
  size: Size;
  redrawsCount: number;
  isImageExists: boolean;
  setSize: (size: Size) => void;
  pushPixels: (imageData: Uint8ClampedArray) => void;
  setFormat: (format: string) => void;
  removeImage: () => void;
  setCurrentHistoryIndex: (currentHistoryIndex: number) => void;
};

const useImageStorage = create<ImageStorage>()((set, get) => ({
  format: null,
  currentHistoryIndex: -1,
  previousPixels: null,
  history: [],
  size: { width: 0, height: 0 },
  redrawsCount: 0,
  isImageExists: false,
  setSize: (size) => set({ size }),
  setFormat: (format) => set({ format }),
  pushPixels: (pixels) => {
    const currentHistoryIndex = get().currentHistoryIndex;
    let newHistory: Uint8ClampedArray[] = get().history.slice(
      0,
      currentHistoryIndex + 1,
    );
    newHistory.push(pixels);
    if (newHistory.length > MAX_HISTORY_SIZE) {
      newHistory = newHistory.slice(1);
    }
    const newcurrentHistoryIndex = newHistory.length - 1;
    set({
      history: newHistory,
      currentHistoryIndex: newcurrentHistoryIndex,
      isImageExists: true,
      redrawsCount: get().redrawsCount + 1,
    });
  },
  setCurrentHistoryIndex: (currentHistoryIndex) => {
    const historyLength = get().history.length;
    if (
      currentHistoryIndex < 0 ||
      historyLength === 0 ||
      currentHistoryIndex >= historyLength ||
      currentHistoryIndex === get().currentHistoryIndex
    )
      return;
    set({ currentHistoryIndex, redrawsCount: get().redrawsCount + 1 });
  },
  removeImage: () => {
    set({
      history: [],
      format: null,
      currentHistoryIndex: -1,
      size: { width: 0, height: 0 },
      isImageExists: false,
      redrawsCount: 0,
    });
  },
}));

export default useImageStorage;
