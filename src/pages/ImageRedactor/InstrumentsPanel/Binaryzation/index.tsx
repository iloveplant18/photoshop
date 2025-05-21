import IconButton from "@/components/IconButton";
import useBinarization from "./hooks/useBinarization";
import { useState } from "react";
import { ColorType, RGBColor } from "@/types/types";
import Modal from "@/components/Modal";
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
import { Color } from "@rc-component/color-picker/lib/color";

function Binarization() {
  const [brightnessLevel, setBrightnessLevel] = useState(127);
  const [firstColor, setFirstColor] = useState<RGBColor>({
    type: ColorType.RGB,
    value: { red: 0, green: 0, blue: 0 },
  });
  const [secondColor, setSecondColor] = useState<RGBColor>({
    type: ColorType.RGB,
    value: { red: 0, green: 0, blue: 0 },
  });
  const [isModalShown, setIsModalShown] = useState(false);
  const { applyBinarization } = useBinarization(brightnessLevel, firstColor, secondColor);

  function handleColorChange(
    color: Color,
    setColor: (color: RGBColor) => void,
  ) {
    const hydratedColor: RGBColor = {
      type: ColorType.RGB,
      value: {
        red: color.r,
        green: color.g,
        blue: color.b,
      },
    };
    setColor(hydratedColor);
  }

  return (
    <>
      <div className="tooltip tooltip-primary" data-tip="В двухцветное">
        <IconButton onClick={() => setIsModalShown(true)}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0001 1.13611L5.63604 7.50002C2.12132 11.0147 2.12132 16.7132 5.63604 20.2279C7.39343 21.9853 9.69679 22.864 12.0001 22.864C12.288 22.864 12.5759 22.8502 12.8627 22.8228C14.8706 22.6306 16.8264 21.7657 18.3641 20.2279C21.8788 16.7132 21.8788 11.0147 18.3641 7.50002L12.0001 1.13611ZM7.05025 8.91423L12 3.96448L12.0001 20.864C10.2086 20.864 8.41711 20.1806 7.05025 18.8137C4.31658 16.0801 4.31658 11.6479 7.05025 8.91423Z"
              fill="#000000"
            />
          </svg>
        </IconButton>
      </div>
      <Modal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        id="binarization-modal"
        controls={
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => {
              setIsModalShown(false);
              applyBinarization();
            }}
          >
            ОК
          </button>
        }
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold">Бинаризация</h3>
          <span>Выберите цвета</span>
          <div className="mt-3 flex justify-between gap-x-4">
            <ColorPicker
              onChange={(color) => handleColorChange(color, setFirstColor)}
              style={{ backgroundColor: "var(--color-base-300)" }}
            />
            <ColorPicker
              onChange={(color) => handleColorChange(color, setSecondColor)}
              style={{ backgroundColor: "var(--color-base-300)" }}
            />
          </div>
          <div className="mt-3">
            <span>Выберите порог яркости</span>
            <input
              type="range"
              min={0}
              max={255}
              value={brightnessLevel}
              onChange={(event) => setBrightnessLevel(+event.target.value)}
              className="range range-accent mt-1"
            />
            {brightnessLevel}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Binarization;
