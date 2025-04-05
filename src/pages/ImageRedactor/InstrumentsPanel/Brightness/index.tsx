import IconButton from "@/components/IconButton";
import useBrightness from "../BrightnessAndContrast/hooks/useBrightness";
import { useState } from "react";
import Modal from "@/components/Modal";

function Brightness() {
  const { applyBrightness } = useBrightness();
  const [brightnessLevel, setBrightnessLevel] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <div className="tooltip tooltip-primary" data-tip="Яркость">
        <IconButton onClick={() => setIsModalShown(true)}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0C11.4477 0 11 0.447715 11 1V3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3V1C13 0.447715 12.5523 0 12 0Z"
              fill="#0F0F0F"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM9.21518 14.7848C8.50248 14.0721 8.06167 13.0875 8.06167 12C8.06167 9.82492 9.82492 8.06167 12 8.06167C13.0875 8.06167 14.0721 8.50248 14.7848 9.21518L9.21518 14.7848Z"
              fill="#0F0F0F"
            />
            <path
              d="M19.0711 3.51472C19.4616 3.12419 20.0947 3.12419 20.4853 3.51472C20.8758 3.90524 20.8758 4.53841 20.4853 4.92893L19.0711 6.34315C18.6805 6.73367 18.0474 6.73367 17.6568 6.34315C17.2663 5.95262 17.2663 5.31946 17.6568 4.92893L19.0711 3.51472Z"
              fill="#0F0F0F"
            />
            <path
              d="M0 12C0 12.5523 0.447715 13 1 13H3C3.55228 13 4 12.5523 4 12C4 11.4477 3.55228 11 3 11H1C0.447715 11 0 11.4477 0 12Z"
              fill="#0F0F0F"
            />
            <path
              d="M3.51472 4.92893C3.1242 4.53841 3.1242 3.90524 3.51472 3.51472C3.90525 3.12419 4.53841 3.12419 4.92894 3.51472L6.34315 4.92893C6.73368 5.31946 6.73368 5.95262 6.34315 6.34314C5.95263 6.73367 5.31946 6.73367 4.92894 6.34314L3.51472 4.92893Z"
              fill="#0F0F0F"
            />
            <path
              d="M12 20C11.4477 20 11 20.4477 11 21V23C11 23.5523 11.4477 24 12 24C12.5523 24 13 23.5523 13 23V21C13 20.4477 12.5523 20 12 20Z"
              fill="#0F0F0F"
            />
            <path
              d="M4.92894 17.6569C5.31946 17.2663 5.95263 17.2663 6.34315 17.6569C6.73368 18.0474 6.73368 18.6805 6.34315 19.0711L4.92894 20.4853C4.53842 20.8758 3.90525 20.8758 3.51473 20.4853C3.1242 20.0948 3.1242 19.4616 3.51473 19.0711L4.92894 17.6569Z"
              fill="#0F0F0F"
            />
            <path
              d="M20 12C20 12.5523 20.4477 13 21 13H23C23.5523 13 24 12.5523 24 12C24 11.4477 23.5523 11 23 11H21C20.4477 11 20 11.4477 20 12Z"
              fill="#0F0F0F"
            />
            <path
              d="M17.6568 19.0711C17.2663 18.6805 17.2663 18.0474 17.6568 17.6569C18.0474 17.2663 18.6805 17.2663 19.0711 17.6569L20.4853 19.0711C20.8758 19.4616 20.8758 20.0948 20.4853 20.4853C20.0947 20.8758 19.4616 20.8758 19.0711 20.4853L17.6568 19.0711Z"
              fill="#0F0F0F"
            />
          </svg>
        </IconButton>
      </div>
      <Modal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        id="brightness-modal"
        controls={
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => {
              setIsModalShown(false);
              applyBrightness(brightnessLevel);
            }}
          >
            ОК
          </button>
        }
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold">Яркость</h3>
          <div className="mt-3">
            <span>Яркость</span>
            <input
              type="range"
              min={-255}
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

export default Brightness;
