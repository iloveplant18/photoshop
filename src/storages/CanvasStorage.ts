import { create } from "zustand";

type CanvasStorage = {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  setCanvas: (canvas: HTMLCanvasElement) => void;
};

const useCanvasStorage = create<CanvasStorage>()((set) => ({
  canvas: null,
  context: null,
  setCanvas: (newCanvas) => {
    const context = newCanvas.getContext("2d");
    if (!context) throw new Error("cant get context from canvas");
    set({ canvas: newCanvas, context: context });
  },
}));

export default useCanvasStorage;
