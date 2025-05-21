import calcBrightness from "@/utils/calcBrightness";
import useImageDataHandler from "@/hooks/useImageDataHandler";

function useBlackAndWhiteFilter() {
  const applyBlackAndWhiteFilter = useImageDataHandler((i, data) => {
    const brightness = calcBrightness(data[i]!, data[i + 1]!, data[i + 2]!);
    [data[i], data[i + 1], data[i + 2]] = Array(3).fill(brightness);
  });

  return { applyBlackAndWhiteFilter };
}

export default useBlackAndWhiteFilter;
