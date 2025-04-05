import { create } from "zustand";

type ProgressStorage = {
  progress: number;
  setProgress: (progress: number) => void;
};

const useProgressStore = create<ProgressStorage>()((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
}));

export default useProgressStore;
