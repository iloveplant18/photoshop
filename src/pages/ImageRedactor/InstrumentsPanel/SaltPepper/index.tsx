import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
import { useState } from "react";
import useSaltPepper from "./hooks/useSaultPepper";

function SaltPepper() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [saltPepperProbability, setSaltPepperProbability] =
    useState<number>(0.2);
  const { applySaltPepper } = useSaltPepper(saltPepperProbability);

  return (
    <>
      <div className="tooltip tooltip-primary" data-tip="Соль перец">
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 13v.01" />
            <path d="M10 16v.01" />
            <path d="M14 16v.01" />
            <path d="M7.5 8h9l-.281 -2.248a2 2 0 0 0 -1.985 -1.752h-4.468a2 2 0 0 0 -1.986 1.752l-.28 2.248z" />
            <path d="M7.5 8l-1.612 9.671a2 2 0 0 0 1.973 2.329h8.278a2 2 0 0 0 1.973 -2.329l-1.612 -9.671" />
          </svg>
        </IconButton>
      </div>
      <Modal
        isModalShown={isOpen}
        setIsModalShown={setIsOpen}
        id="salt-pepper-modal"
        controls={
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => {
              setIsOpen(false);
              applySaltPepper();
            }}
          >
            ОК
          </button>
        }
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold">Соль перец</h3>
          <div className="mt-3">
            <input
              className="range range-accent"
              type="range"
              min={0.0}
              max={0.4}
              step="0.01"
              value={saltPepperProbability}
              onInput={(ev) =>
                setSaltPepperProbability(+(ev.target as HTMLInputElement).value)
              }
            />
            {saltPepperProbability}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SaltPepper;
