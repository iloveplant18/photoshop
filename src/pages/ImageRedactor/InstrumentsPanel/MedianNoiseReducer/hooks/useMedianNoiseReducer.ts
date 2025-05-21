import useImageDataHandler from "@/hooks/useImageDataHandler";
import useImageStorage from "@/storages/ImageStorage";
import calcAmpertureIndexes from "@/utils/calcAmpertureIndexes";
import calcBrightness from "@/utils/calcBrightness";

function useMedianNoiseReducer() {
  const size = useImageStorage((store) => store.size);
  const applyMedianNoiseReducer = useImageDataHandler(
    (i, data): void => {
      const ampertureIndexes = calcAmpertureIndexes(
        i,
        size.width,
        size.height,
        1,
      );
      const medianBrightness = findMedianBrightness(data, ampertureIndexes);
      const currentBrightness = calcBrightness(
        data[i]!,
        data[i + 1]!,
        data[i + 2]!,
      );
      const diff = medianBrightness - currentBrightness;

      data[i] = Math.min(Math.max(data[i]! + diff, 0), 255);
      data[i + 1] = Math.min(Math.max(data[i + 1]! + diff, 0), 255);
      data[i + 2] = Math.min(Math.max(data[i + 2]! + diff, 0), 255);
    },
    {
      chunkSize: 40_000,
    },
  );

  return applyMedianNoiseReducer;
}

function findMedianBrightness(
  data: Uint8ClampedArray,
  indexes: (number | null)[],
): number {
  const validatedIndexes = indexes.filter((i) => i !== null);
  if (validatedIndexes.length === 0) return 0;
  let brightnesses = validatedIndexes
    .map((i) => calcBrightness(data[i]!, data[i + 1]!, data[i + 2]!))
    .sort((a, b) => a - b);
  const medianIndex = Math.floor(brightnesses.length / 2);
  return brightnesses[medianIndex] as number;
}

export default useMedianNoiseReducer;
