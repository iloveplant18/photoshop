import { memo, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseButton from "./CloseButton";

type ModalProps = {
  id: string;
  isModalShown: boolean;
  setIsModalShown: (value: boolean) => void;
  children: ReactNode;
  controls?: ReactNode;
  cancelButtonText?: string;
};

const Modal = memo(
  ({
    isModalShown,
    setIsModalShown,
    id,
    children,
    controls,
    cancelButtonText,
  }: ModalProps) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
      if (!modalRef.current) return;

      if (isModalShown) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }, [isModalShown]);

    return createPortal(
      <dialog
        className="modal"
        id={id}
        ref={modalRef}
        onClose={() => setIsModalShown(false)}
      >
        <div className="modal-box">
          <div className="flex justify-end">
            <CloseButton
              screenReaderText="Закрыть окно"
              onClick={() => setIsModalShown(false)}
            />
          </div>
          {children}
          <div className="mt-6 flex gap-x-2 justify-end items-center">
            {controls}
            <button
              className="btn btn-sm btn-ghost rounded-xl"
              onClick={() => setIsModalShown(false)}
            >
              {cancelButtonText ?? "Отмена"}
            </button>
          </div>
        </div>
        <button
          className="modal-backdrop min-h-screen"
          onClick={() => setIsModalShown(false)}
        ></button>
      </dialog>,
      document.body,
    );
  },
);

export default Modal;
