import useImageDataHandler from "@/hooks/useImageDataHandler";
import calcBrightness from "@/utils/calcBrightness";

function useSaltPepper(saultPepperProbability: number) {
  const applySaltPepper = useImageDataHandler((i, data) => {
    if (Math.random() <= saultPepperProbability) {
      const pixelBrightness = calcBrightness(
        data[i]!,
        data[i + 1]!,
        data[i + 2]!,
      );
      if (pixelBrightness > 127) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      } else {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      }
    }
  });

  return { applySaltPepper };
}

export default useSaltPepper;
