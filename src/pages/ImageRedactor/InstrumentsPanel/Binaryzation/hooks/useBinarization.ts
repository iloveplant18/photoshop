import { RGBColor } from "@/types/types";
import calcBrightness from "@/utils/calcBrightness";
import useImageDataHandler from "@/hooks/useImageDataHandler";

function useBinarization(
  brightnessLevel: number,
  firstColor: RGBColor,
  secondColor: RGBColor,
) {
  const applyBinarization = useImageDataHandler((i, data) => {
    const brightness = calcBrightness(data[i]!, data[i + 1]!, data[i + 2]!);
    if (brightness > brightnessLevel) {
      data[i] = firstColor.value.red;
      data[i + 1] = firstColor.value.green;
      data[i + 2] = firstColor.value.blue;
    } else {
      data[i] = secondColor.value.red;
      data[i + 1] = secondColor.value.green;
      data[i + 2] = secondColor.value.blue;
    }
  });

  return { applyBinarization };
}

export default useBinarization;
