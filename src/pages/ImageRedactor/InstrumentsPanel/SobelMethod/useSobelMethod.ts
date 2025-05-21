import useImageStorage from "@/storages/ImageStorage";
import useImageDataHandler from "@/hooks/useImageDataHandler";
import calcAmpertureIndexes from "@/utils/calcAmpertureIndexes";
import calcBrightnessesByIndexes from "@/utils/calcBrightnessesByIndexes";
import updatePixelByNewBrightness from "@/utils/updatePixelByNewBrightness";

export default function useSobelMethod() {
  const { width, height } = useImageStorage((store) => store.size);

  const applySobelMethod = useImageDataHandler((i, data, originalData) => {
    const indexes = calcAmpertureIndexes(i, width, height, 1);
    const filteredIndexes = indexes.filter((index) => index != null);
    if (filteredIndexes.length !== 9) return;
    const brightnesses = calcBrightnessesByIndexes(
      filteredIndexes,
      originalData,
    );
    const x =
      brightnesses[0]! +
      brightnesses[1]! * 2 +
      brightnesses[2]! -
      (brightnesses[6]! + brightnesses[7]! * 2 + brightnesses[8]!);
    const y =
      brightnesses[0]! +
      brightnesses[3]! * 2 +
      brightnesses[6]! -
      (brightnesses[2]! + brightnesses[5]! * 2 + brightnesses[8]!);
    const finalBrightness = Math.sqrt(x ** 2 + y ** 2);
    updatePixelByNewBrightness(i, finalBrightness, data);
  });

  return applySobelMethod;
}
