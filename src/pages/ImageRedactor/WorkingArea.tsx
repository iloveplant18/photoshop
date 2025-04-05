import { TransformComponent } from "react-zoom-pan-pinch";
import { useEffect, useRef } from "react";
import useImageDrawer from "./hooks/useImageDrawer";
import useCanvasStorage from "@/storages/CanvasStorage";
import useOriginalImageStorage from "@/storages/OriginalImageStorage";

function WorkingArea() {
  const setCanvas = useCanvasStorage((store) => store.setCanvas);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const originalImageSrc = useOriginalImageStorage((store) => store.src);
  const isOriginalImageShown = useOriginalImageStorage(
    (store) => store.isShown,
  );

  useImageDrawer();

  useEffect(() => {
    if (!canvasRef.current) return;
    setCanvas(canvasRef.current);
  }, []);

  return (
    <div className="h-full max-h-full max-w-full bg-base-400 rounded-xl">
      <TransformComponent
        wrapperStyle={{
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      >
        <div className="bg-base-100/40 relative">
          <canvas
            className={isOriginalImageShown ? "hidden" : ""}
            width={0}
            height={0}
            id="canvas"
            ref={canvasRef}
          ></canvas>
          {originalImageSrc && (
            <img
              className={isOriginalImageShown ? "" : "hidden"}
              src={originalImageSrc}
              alt=""
              loading="lazy"
            />
          )}
        </div>
      </TransformComponent>
    </div>
  );
}

export default WorkingArea;
