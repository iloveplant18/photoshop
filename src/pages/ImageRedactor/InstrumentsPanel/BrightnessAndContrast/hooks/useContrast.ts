import useImageStorage from "@/storages/ImageStorage";
import useProgressStore from "@/storages/ProgressStorage";
import { defaultChunkSize } from "@/utils/consts";

function useContrast() {
  const currentHistoryIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const pushPixels = useImageStorage((store) => store.pushPixels);
  const history = useImageStorage((store) => store.history);
  const setProgress = useProgressStore((store) => store.setProgress);

  const applyContrast = (contrastLevel: number) => {
    if (currentHistoryIndex === -1) return;

    const data = structuredClone(history[currentHistoryIndex]!);
    let i = 0;
    let percentLength = data.length / 100;

    // Convert contrast level to factor
    const factor = (259 * (contrastLevel + 255)) / (255 * (259 - contrastLevel));

    function handleDataChunk() {
      const end = Math.min(data.length, i + defaultChunkSize);
      for (; i < end; i += 4) {
        data[i] = Math.min(255, Math.max(0, factor * (data[i]! - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1]! - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2]! - 128) + 128));
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

  return { applyContrast };
}

export default useContrast; 