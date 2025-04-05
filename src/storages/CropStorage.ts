import { create } from "zustand";

type CropStorage = {
  isCropShown: boolean;
  setIsCropShown: (isCropShown: boolean) => void;
};

const useCropStorage = create<CropStorage>()((set) => ({
  isCropShown: false,
  setIsCropShown: (isCropShown) => set({ isCropShown }),
}));

export default useCropStorage;
