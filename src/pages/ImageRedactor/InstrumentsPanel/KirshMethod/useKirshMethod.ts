import useImageDataHandler from "@/hooks/useImageDataHandler";
import calcAmpertureIndexes from "@/utils/calcAmpertureIndexes";
import useImageStorage from "@/storages/ImageStorage";
import calcBrightnessesByIndexes from "@/utils/calcBrightnessesByIndexes";
import zip from "@/utils/zip";
import updateRGBByNewBrightness from "@/utils/updatePixelByNewBrightness";
import sortByCircleOrder from "@/utils/sortByCircle";

export default function useKirshMethod() {
  const { width, height } = useImageStorage((store) => store.size);

  const applyKirshMethod = useImageDataHandler((i, data, originalData) => {
    const pixelIndexes = calcAmpertureIndexes(i, width, height, 1);
    const filteredIndexes = pixelIndexes.filter((index) => index) as number[];
    if (filteredIndexes.length != 9) return;

    const sortedIndexes = sortByCircleOrder(filteredIndexes) as number[];
    sortedIndexes.length = 8;
    const brightnesses = calcBrightnessesByIndexes(sortedIndexes, originalData);
    const SList = brightnesses.map((_, index, arr) => calcS(index, arr));
    const TList = brightnesses.map((_, index, arr) => calcT(index, arr));
    const finalBrightness =
      zip(SList, TList).reduce((maxF, [s, t]) => {
        const F = Math.abs(5 * s - 3 * t);
        if (F > maxF) return F;
        return maxF;
      }, 0) - 200;
    updateRGBByNewBrightness(i, finalBrightness, data);
  });

  return applyKirshMethod;
}

function calcS(index: number, brightnesses: number[]) {
  return (
    brightnesses[index]! +
    brightnesses[addByModule8(index, 1)]! +
    brightnesses[addByModule8(index, 2)]!
  );
}

function calcT(index: number, brightnesses: number[]) {
  return (
    brightnesses[addByModule8(index, 3)]! +
    brightnesses[addByModule8(index, 4)]! +
    brightnesses[addByModule8(index, 5)]! +
    brightnesses[addByModule8(index, 6)]! +
    brightnesses[addByModule8(index, 7)]!
  );
}

function addByModule8(a: number, b: number) {
  return (a + b) % 8;
}
