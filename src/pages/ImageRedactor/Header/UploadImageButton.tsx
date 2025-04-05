import useImageStorage from "../../../storages/ImageStorage";
import { useState } from "react";
import Modal from "@/components/Modal";

function UploadImageButton() {
  const removeImage = useImageStorage((store) => store.removeImage);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  function showModalToConfirmContinue() {
    setIsModalShown(true);
  }

  function removeImageAndCloseModal() {
    removeImage();
    setIsModalShown(false);
  }

  return (
    <>
      <button
        className="btn btn-soft btn-sm btn-primary"
        onClick={showModalToConfirmContinue}
      >
        Загрузить изображение
      </button>
      <Modal
        id="remove-old-image-modal"
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        controls={
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={removeImageAndCloseModal}
          >
            Да
          </button>
        }
      >
        <div>Старое изображение будет удалено. Продолжить?</div>
      </Modal>
    </>
  );
}

export default UploadImageButton;
