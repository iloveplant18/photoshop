import useImageDataHandler from "@/hooks/useImageDataHandler";
import useImageStorage from "@/storages/ImageStorage";
import calcAmpertureIndexes from "@/utils/calcAmpertureIndexes";
import calcBrightness from "@/utils/calcBrightness";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness";

export default function useLaplasMethod() {
  const { width, height } = useImageStorage((store) => store.size);
  const coefficients = [-1, -2, -1, -2, 12, -2, -1, -2, 1];

  const applyLaplasMethod = useImageDataHandler((i, data, originalData) => {
    const indexes = calcAmpertureIndexes(i, width, height, 1);
    const filteredIndexes = indexes.filter((index) => index !== null);
    if (filteredIndexes.length !== 9) return;
    const finalBrightness = filteredIndexes.reduce(
      (accum, pixelIndex, elementIndex) => {
        const brightness = calcBrightness(
          originalData[pixelIndex]!,
          originalData[pixelIndex + 1]!,
          originalData[pixelIndex + 2]!,
        );
        return accum + coefficients[elementIndex]! * brightness;
      },
      0,
    );
    updatePixelByNewBrightness(i, finalBrightness, data);
  });

  return applyLaplasMethod;
}
