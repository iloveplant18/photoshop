import { RGBColor } from "@/types/types";
import calcBrightness from "@/utils/calcBrightness";
import useImageStorage from "@/storages/ImageStorage";
import useProgressStore from "@/storages/ProgressStorage";
import { chunkSize } from "@/utils/consts";

function useBinarization() {
  const currentHistoryIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const pushPixels = useImageStorage((store) => store.pushPixels);
  const history = useImageStorage((store) => store.history);
  const setProgress = useProgressStore((store) => store.setProgress);

  const applyBinarization = (
    brightnessLevel: number,
    firstColor: RGBColor,
    secondColor: RGBColor,
  ) => {
    if (currentHistoryIndex === -1) return;

    const data = structuredClone(history[currentHistoryIndex]!);
    let i = 0;
    let percentLength = data.length / 100;

    function handleDataChunk() {
      const end = Math.min(data.length, i + chunkSize);
      for (; i < end; i += 4) {
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
      }

      if (i < data.length) {
        requestIdleCallback(handleDataChunk);
        setProgress(i / percentLength);
      } else {
        pushPixels(data);
        setProgress(0);
      }
    }

    requestIdleCallback(handleDataChunk);
  };

  return { applyBinarization };
}

export default useBinarization;
