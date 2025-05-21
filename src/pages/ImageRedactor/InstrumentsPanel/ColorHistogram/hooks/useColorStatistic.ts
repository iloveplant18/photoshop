import useImageStorage from "@/storages/ImageStorage";
import calcBrightness from "@/utils/calcBrightness";
import { useEffect, useState } from "react";
import { defaultChunkSize } from "@/utils/consts";

function useColorStatistic() {
  const history = useImageStorage((state) => state.history);
  const currentHistoryIndex = useImageStorage(
    (state) => state.currentHistoryIndex,
  );
  const redrawsCount = useImageStorage((state) => state.redrawsCount);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [statistic, setStatistic] = useState(createEmptyStatistic);

  useEffect(() => {
    if (currentHistoryIndex === -1) {
      setStatistic(createEmptyStatistic());
      return;
    }
    let isProcessing = true;
    let customChunkSize = defaultChunkSize / 3;
    const pixels = history[currentHistoryIndex] as Uint8ClampedArray;
    const newStatistic = createEmptyStatistic();
    let i = 0;
    const percentInPixels = pixels.length / 100;

    requestIdleCallback(handlePixelsChunk);

    function handlePixelsChunk() {
      if (!isProcessing) return;
      const end = Math.min(i + customChunkSize, pixels.length);

      for (; i < end; i += 4) {
        const r = pixels[i] as number;
        const g = pixels[i + 1] as number;
        const b = pixels[i + 2] as number;
        newStatistic.redStat[r]++;
        newStatistic.greenStat[g]++;
        newStatistic.blueStat[b]++;
        newStatistic.brightnessStat[calcBrightness(r, g, b)]++;
      }

      if (i === pixels.length) {
        setStatistic(newStatistic);
        setLoadingPercent(0);
      } else {
        setLoadingPercent(i / percentInPixels);
        requestIdleCallback(handlePixelsChunk);
      }
    }

    return () => {
      isProcessing = false;
    };
  }, [redrawsCount]);

  return { ...statistic, loadingPercent };
}

function createEmptyStatistic() {
  return {
    brightnessStat: Array(256).fill(0),
    redStat: Array(256).fill(0),
    greenStat: Array(256).fill(0),
    blueStat: Array(256).fill(0),
  };
}

export default useColorStatistic;
