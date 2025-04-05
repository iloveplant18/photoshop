import useImageStorage from "@/storages/ImageStorage";
import useProgressStore from "@/storages/ProgressStorage";
import { chunkSize } from "@/utils/consts";

function useBrightness() {
  const currentHistoryIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const pushPixels = useImageStorage((store) => store.pushPixels);
  const history = useImageStorage((store) => store.history);
  const setProgress = useProgressStore((store) => store.setProgress);

  const applyBrightness = async (brightnessLevel: number) => {
    return new Promise((resolve) => {
      if (currentHistoryIndex === -1) return;

      const data = structuredClone(history[currentHistoryIndex]!);
      let i = 0;
      let percentLength = data.length / 100;

      function handleDataChunk() {
        const end = Math.min(data.length, i + chunkSize);
        for (; i < end; i += 4) {
          data[i] = Math.min(255, Math.max(0, data[i]! + brightnessLevel));
          data[i + 1] = Math.min(
            255,
            Math.max(0, data[i + 1]! + brightnessLevel),
          );
          data[i + 2] = Math.min(
            255,
            Math.max(0, data[i + 2]! + brightnessLevel),
          );
        }

        if (i < data.length) {
          requestIdleCallback(handleDataChunk);
          setProgress(i / percentLength);
        } else {
          pushPixels(data);
          setProgress(0);
          resolve(true);
          console.log("birghtness done")
        }
      }

      requestIdleCallback(handleDataChunk);
    });
  };

  return { applyBrightness };
}

export default useBrightness;
