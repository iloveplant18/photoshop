import useImageStorage from "@/storages/ImageStorage";
import useImageDataHandler from "@/hooks/useImageDataHandler";
import calcAmpertureIndexes from "@/utils/calcAmpertureIndexes";
import calcBrightnessesByIndexes from "@/utils/calcBrightnessesByIndexes";
import calcBrightness from "@/utils/calcBrightness";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness";

export default function useStaticMethod() {
  const { width, height } = useImageStorage((store) => store.size);
  const radius = 1;

  const applyStaticMethod = useImageDataHandler((i, data, originalData) => {
    const indexes = calcAmpertureIndexes(i, width, height, radius);
    const filteredIndexes = indexes.filter((index) => index) as number[];
    const brightnesses = calcBrightnessesByIndexes(
      filteredIndexes,
      originalData,
    );
    const avg =
      brightnesses.reduce((sum, value) => sum + value, 0) / brightnesses.length;
    const avgDeviation = Math.sqrt(
      brightnesses.reduce((sum, value) => sum + (value - avg) ** 2, 0) /
        brightnesses.length,
    );
    for (let j of filteredIndexes) {
      const pixelBrightness = calcBrightness(
        originalData[j]!,
        originalData[j + 1]!,
        originalData[j + 2]!,
      );
      const finalBrightness = pixelBrightness * avgDeviation;
      updatePixelByNewBrightness(j, finalBrightness, data);
    }
  });

  return applyStaticMethod;
}
