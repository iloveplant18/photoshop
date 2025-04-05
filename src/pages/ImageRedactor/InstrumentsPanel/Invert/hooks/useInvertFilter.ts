import useImageStorage from "@/storages/ImageStorage";
import useProgressStore from "@/storages/ProgressStorage";
import { chunkSize } from "@/utils/consts";

function useInvertFilter() {
  const currentHistoryIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const history = useImageStorage((store) => store.history);
  const pushPixels = useImageStorage((store) => store.pushPixels);
  const setProgress = useProgressStore((store) => store.setProgress);

  const applyInvertFilter = () => {
    if (currentHistoryIndex === -1) return;

    const data = structuredClone(history[currentHistoryIndex])!;
    let i = 0;
    let percentLength = data.length / 100;

    function handleDataChunk() {
      const end = Math.min(i + chunkSize, data.length);
      for (; i < end; i += 4) {
        data[i] = 255 - data[i]!;
        data[i + 1] = 255 - data[i + 1]!;
        data[i + 2] = 255 - data[i + 2]!;
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

  return { applyInvertFilter };
}

export default useInvertFilter;
