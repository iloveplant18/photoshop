import useImageDataHandler from "@/hooks/useImageDataHandler";
import useImageStorage from "@/storages/ImageStorage";
import calcAmpertureIndexes from "@/utils/calcAmpertureIndexes";
import calcBrightness from "@/utils/calcBrightness";

function useLinearNoiseReducer() {
  const imageSize = useImageStorage((store) => store.size);
  const ampertureRadius = 1;

  const applyLinearNoiseReducer = useImageDataHandler(
    (i, data) => {
      const ampertureIndexes = calcAmpertureIndexes(
        i,
        imageSize.width,
        imageSize.height,
        ampertureRadius,
      );
      const currentBrightness = calcBrightness(
        data[i]!,
        data[i + 1]!,
        data[i + 2]!,
      );
      const mediumBrightness = calcMediumBrightness(data, ampertureIndexes);
      const diff = currentBrightness - mediumBrightness;

      data[i] = Math.min(Math.max(data[i]! - diff, 0), 255);
      data[i + 1] = Math.min(Math.max(data[i + 1]! - diff, 0), 255);
      data[i + 2] = Math.min(Math.max(data[i + 2]! - diff, 0), 255);
    },
    {
      chunkSize: 50_000,
    },
  );

  return applyLinearNoiseReducer;
}

function calcMediumBrightness(
  data: Uint8ClampedArray,
  indexes: (number | null)[],
) {
  const validIndexes = indexes.filter((value) => value != null);
  const brightnesses = validIndexes.map((index) =>
    calcBrightness(data[index]!, data[index + 1]!, data[index + 2]!),
  );
  if (brightnesses.length === 0) return 0;
  return (
    brightnesses.reduce((accum, current) => accum + current, 0) /
    brightnesses.length
  );
}

export default useLinearNoiseReducer;
