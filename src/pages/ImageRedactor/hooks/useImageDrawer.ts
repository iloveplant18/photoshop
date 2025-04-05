import useCanvasStorage from "@/storages/CanvasStorage";
import useImageStorage from "@/storages/ImageStorage";
import { useEffect } from "react";

function useImageDrawer() {
  const context = useCanvasStorage((store) => store.context);
  const canvas = useCanvasStorage((store) => store.canvas);
  const currentHistoryIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const history = useImageStorage((store) => store.history);
  const imageSize = useImageStorage((store) => store.size);
  const redrawsCount = useImageStorage((store) => store.redrawsCount);

  useEffect(() => {
    if (!context || !canvas) {
      return;
    } else if (currentHistoryIndex === -1) {
      clearCanvas();
    } else {
      drawImageData();
    }
  }, [currentHistoryIndex, context, redrawsCount]);

  function clearCanvas() {
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    canvas!.width = 0;
    canvas!.height = 0;
  }

  function drawImageData() {
    const imageData = new ImageData(
      history[currentHistoryIndex]!,
      imageSize.width,
      imageSize.height,
    );
    context!.putImageData(imageData, 0, 0);
  }
}

export default useImageDrawer;
