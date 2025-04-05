import IconButton from "@/components/IconButton";
import useContrast from "../BrightnessAndContrast/hooks/useContrast";
import { useState } from "react";
import Modal from "@/components/Modal";

function Contrast() {
  const { applyContrast } = useContrast();
  const [contrastLevel, setContrastLevel] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <div className="tooltip tooltip-primary" data-tip="Контраст">
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
              d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
              fill="#000000"
            />
          </svg>
        </IconButton>
      </div>
      <Modal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        id="contrast-modal"
        controls={
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => {
              setIsModalShown(false);
              applyContrast(contrastLevel);
            }}
          >
            ОК
          </button>
        }
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold">Контраст</h3>
          <div className="mt-3">
            <span>Контраст</span>
            <input
              type="range"
              min={-255}
              max={255}
              value={contrastLevel}
              onChange={(event) => setContrastLevel(+event.target.value)}
              className="range range-accent mt-1"
            />
            {contrastLevel}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Contrast; 