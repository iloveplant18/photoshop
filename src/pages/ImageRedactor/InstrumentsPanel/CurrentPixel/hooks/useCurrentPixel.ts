import { useEffect, useState } from "react";
import { Color, ColorType, Position } from "@/types/types";
import transformRgbToColorType from "@/utils/transformRgbToColorType";

function useCurrentPixel(
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null,
  colorType: ColorType,
) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [color, setColor] = useState<Color>(getDefaultColor);

  function getDefaultColor(): Color {
    if (colorType === ColorType.Hex) {
      return { type: ColorType.Hex, value: "000000" };
    }
    return {
      type: ColorType.RGB,
      value: { red: 0, green: 0, blue: 0, alpha: 0 },
    };
  }

  useEffect(() => {
    if (!canvas || !context) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      getAndSetPositionFromEvent(offsetX, offsetY);
      getAndSetColorFromCurrentPixel(offsetX, offsetY, context);
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canvas, context, colorType]);

  function getAndSetPositionFromEvent(offsetX: number, offsetY: number) {
    const position = {
      x: offsetX,
      y: offsetY,
    };
    setPosition(position);
  }

  function getAndSetColorFromCurrentPixel(
    offsetX: number,
    offsetY: number,
    context: CanvasRenderingContext2D,
  ) {
    const [red, green, blue, alpha] = context.getImageData(
      offsetX,
      offsetY,
      1,
      1,
    ).data;
    const color = transformRgbToColorType(
      colorType,
      red ?? 0,
      green ?? 0,
      blue ?? 0,
      alpha ?? 0,
    );
    setColor(color);
  }

  return { color, position };
}

export default useCurrentPixel;
