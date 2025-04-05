import formatColor from "@/utils/formatColor";
import useCanvasStorage from "@/storages/CanvasStorage";
import useColorType from "./hooks/useColorType";
import useCurrentPixel from "./hooks/useCurrentPixel";
import ColorTypeMenu from "./ColorTypeMenu";

function CurrentPixel() {
  const { canvas, context } = useCanvasStorage();
  const { colorType, setColorType } = useColorType();
  const { color, position } = useCurrentPixel(canvas, context, colorType);

  const colorString = formatColor(color);

  return (
    <div className="flex flex-col text-xs">
      <span>x:&nbsp;{position.x}</span>
      <span>y:&nbsp;{position.y}</span>
      <span>
        цвет:&nbsp;
        <span
          className="inline-block align-middle min-w-3 h-3 aspect-square"
          style={{ backgroundColor: `${colorString}` }}
        ></span>
        &nbsp;
        {colorString}
      </span>
      <ColorTypeMenu colorType={colorType} setColorType={setColorType} />
    </div>
  );
}

export default CurrentPixel;
