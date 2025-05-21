import useImageDataHandler from "@/hooks/useImageDataHandler";

function useBrightness(brightnessLevel: number) {
  const applyBrightness = useImageDataHandler((i, data) => {
    data[i] = Math.min(255, Math.max(0, data[i]! + brightnessLevel));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1]! + brightnessLevel));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2]! + brightnessLevel));
  });

  return { applyBrightness };
}

export default useBrightness;
