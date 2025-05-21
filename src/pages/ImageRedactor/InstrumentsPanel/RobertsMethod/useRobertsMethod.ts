import useImageStorage from "@/storages/ImageStorage";
import useImageDataHandler from "@/hooks/useImageDataHandler";
import calc2x2AmpertureIndexes from "@/utils/calc2x2Amperture";
import calcBrightnessesByIndexes from "@/utils/calcBrightnessesByIndexes";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness";

export default function useRobertsMethod() {
  const { width, height } = useImageStorage((store) => store.size);

  const applyRobertsMehtod = useImageDataHandler((i, data, originalData) => {
    const indexes = calc2x2AmpertureIndexes(i, width, height);
    const filteredIndexes = indexes.filter((index) => index !== null);
    if (filteredIndexes.length !== 4) return;
    const brightnesses = calcBrightnessesByIndexes(
      filteredIndexes,
      originalData,
    );
    const finalBrightness = Math.sqrt(
      (brightnesses[0]! - brightnesses[3]!) ** 2 +
        (brightnesses[2]! - brightnesses[1]!) ** 2,
    );
    updatePixelByNewBrightness(i, finalBrightness, data);
  });

  return applyRobertsMehtod;
}
