import { useState } from "react";
import { ColorType } from "@/types/types";

function useColorType() {
  const localStorageKey = "colorType";
  const [colorType, setColorType] = useState<ColorType>(
    getSavedOrDefaultColorType(),
  );

  function getSavedOrDefaultColorType(): ColorType {
    const savedColorType = localStorage.getItem(localStorageKey);
    if (savedColorType) {
      return savedColorType as ColorType;
    }
    return ColorType.RGB;
  }

  function setAndSaveColorType(newColorType: ColorType) {
    setColorType(newColorType);
    localStorage.setItem(localStorageKey, newColorType);
  }

  return { colorType, setColorType: setAndSaveColorType };
}

export default useColorType;
