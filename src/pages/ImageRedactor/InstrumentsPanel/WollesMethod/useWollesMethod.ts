import useImageDataHandler from "@/hooks/useImageDataHandler";
import calcAmpertureIndexes from "@/utils/calcAmpertureIndexes";
import useImageStorage from "@/storages/ImageStorage";
import sortByCircleOrder from "@/utils/sortByCircle";
import calcBrightnessesByIndexes from "@/utils/calcBrightnessesByIndexes";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness";

export default function useWollesMethod() {
  const { width, height } = useImageStorage((store) => store.size);

  const applyWollesMethod = useImageDataHandler((i, data, originalData) => {
    const indexes = calcAmpertureIndexes(i, width, height);
    const filteredIndexes = indexes.filter((index) => index) as number[];
    if (filteredIndexes.length !== 9) return;
    const sortedIndexes = sortByCircleOrder(filteredIndexes) as number[];
    const brightnesses = calcBrightnessesByIndexes(sortedIndexes, originalData);
    const finalBrightness =
      (Math.log(
        (brightnesses[8]! / (brightnesses[1]! + 1)) *
          (brightnesses[8]! / (brightnesses[3]! + 1)) *
          (brightnesses[8]! / (brightnesses[5]! + 1)) *
          (brightnesses[8]! / (brightnesses[7]! + 1)),
      ) /
        4) *
      500;

    updatePixelByNewBrightness(i, finalBrightness, data);
  });

  return applyWollesMethod;
}
