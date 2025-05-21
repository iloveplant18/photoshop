import useImageStorage from "@/storages/ImageStorage";
import useProgressStore from "@/storages/ProgressStorage";
import type { HandleData } from "@/types/types";
import { defaultChunkSize } from "@/utils/consts";

type Config = {
  chunkSize?: number;
};

function useImageDataHandler(handleData: HandleData, config?: Config) {
  const currentHistoryIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const history = useImageStorage((store) => store.history);
  const pushPixels = useImageStorage((store) => store.pushPixels);
  const setProgress = useProgressStore((store) => store.setProgress);
  const chunkSize = config?.chunkSize ?? defaultChunkSize;

  const handlingFunction = () => {
    if (currentHistoryIndex === -1) return;

    const dataToChange = structuredClone(history[currentHistoryIndex])!;
    const originalData = structuredClone(history[currentHistoryIndex])!;
    let i = 0;
    let percentLength = dataToChange.length / 100;

    function handleDataChunk() {
      const end = Math.min(i + chunkSize, dataToChange.length);
      for (; i < end; i += 4) {
        handleData(i, dataToChange, originalData);
      }

      if (i < dataToChange.length) {
        requestIdleCallback(handleDataChunk);
        setProgress(i / percentLength);
      } else {
        pushPixels(dataToChange);
        setProgress(0);
      }
    }

    handleDataChunk();
  };

  return handlingFunction;
}

export default useImageDataHandler;
