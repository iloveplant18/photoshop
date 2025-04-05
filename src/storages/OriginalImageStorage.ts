import { create } from "zustand";

type OriginalImageStorage = {
  src: string | null;
  name: string;
  isShown: boolean;
  setSrc: (src: string | null) => void;
  setName: (name: string) => void;
  setIsShown: (isShown: boolean) => void;
};

const useOriginalImageStorage = create<OriginalImageStorage>()((set) => ({
  src: null,
  name: "",
  isShown: false,
  setSrc: (src) => set({ src }),
  setName: (name) => set({ name }),
  setIsShown: (isShown) => set({ isShown }),
}));

export default useOriginalImageStorage;
