import { useEffect, useState } from "react";
import useCanvasStorage from "@/storages/CanvasStorage";
import { Position } from "@/types/types";

function useCanvasDotsPicker() {
  const [dots, setDots] = useState<Position[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvas = useCanvasStorage((store) => store.canvas);

  useEffect(() => {
    if (!isDrawing || !canvas) return;

    function createDot(e: MouseEvent) {
      const dot: Position = { x: e.offsetX, y: e.offsetY };
      setDots((dots) => [...dots, dot]);
    }

    canvas.addEventListener("click", createDot);

    return () => {
      canvas.removeEventListener("click", createDot);
    };
  }, [isDrawing, canvas]);

  return { setIsDrawing, dots };
}

export default useCanvasDotsPicker;
