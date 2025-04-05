import calcBrightness from "@/utils/calcBrightness";
import useImageStorage from "@/storages/ImageStorage";
import { chunkSize } from "@/utils/consts";
import useProgressStore from "@/storages/ProgressStorage";

function useBlackAndWhiteFilter() {
  const currentHistoryIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const history = useImageStorage((store) => store.history);
  const pushPixels = useImageStorage((store) => store.pushPixels);
  const setProgress = useProgressStore((store) => store.setProgress);

  const applyBlackAndWhiteFilter = () => {
    if (currentHistoryIndex === -1) return;

    const data = structuredClone(history[currentHistoryIndex])!;
    let i = 0;
    let percentLength = data.length / 100;

    function handleDataChunk() {
      const end = Math.min(i + chunkSize, data.length);
      for (; i < end; i += 4) {
        const brightness = calcBrightness(data[i]!, data[i + 1]!, data[i + 2]!);
        [data[i], data[i + 1], data[i + 2]] = Array(3).fill(brightness);
      }

      if (i < data.length) {
        requestIdleCallback(handleDataChunk);
        setProgress(i / percentLength);
      } else {
        pushPixels(data);
        setProgress(0);
      }
    }

    handleDataChunk();
  };

  return { applyBlackAndWhiteFilter };
}

export default useBlackAndWhiteFilter;
