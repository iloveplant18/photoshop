import IconButton from "@/components/IconButton";
import useCanvasDotsPicker from "@/hooks/useCanvasDotsPicker";
import { useEffect } from "react";
import { Position } from "@/types/types";
import useCanvasStorage from "@/storages/CanvasStorage";

function BrightnessProfile() {
  const canvas = useCanvasStorage((store) => store.canvas);
  const { setIsDrawing, dots } = useCanvasDotsPicker();

  function handleClick() {
    setIsDrawing(true);
  }

  useEffect(() => {
    if (dots.length > 0) {
      drawDot(dots.at(-1)!);
    }
    if (dots.length === 2) setIsDrawing(false);
  }, [dots]);

  function drawDot(dot: Position) {
    const div = document.createElement("div");
    div.className = "w-2 h-2 bg-accent z-10 absolute";
    div.style.left = dot.x + "px";
    div.style.top = dot.y + "px";
    canvas!.after(div);
  }

  return (
    <span className="tooltip tooltip-primary" data-tip="Профиль яркости">
      <IconButton onClick={handleClick}>Профиль</IconButton>
    </span>
  );
}

export default BrightnessProfile;
