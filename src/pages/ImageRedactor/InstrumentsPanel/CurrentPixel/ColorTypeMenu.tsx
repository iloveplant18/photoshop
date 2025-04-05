import { ColorType } from "@/types/types";

type ColorTypeMenuProps = {
  colorType: ColorType;
  setColorType: (colorType: ColorType) => void;
};

function ColorTypeMenu({ colorType, setColorType }: ColorTypeMenuProps) {
  return (
    <div className="dropdown dropdown-top mt-2">
      <div
        className="tooltip tooltip-primary tooltip-right"
        data-tip="Тип цвета"
      >
        <div tabIndex={0} className="btn btn-sm btn-primary btn-outline">
          {colorType}
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg">
        <li>
          <button
            className="btn btn sm btn-ghost"
            onClick={() => setColorType(ColorType.RGB)}
          >
            {ColorType.RGB}
          </button>
        </li>
        <li>
          <button
            className="btn btn sm btn-ghost"
            onClick={() => setColorType(ColorType.Hex)}
          >
            {ColorType.Hex}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ColorTypeMenu;
