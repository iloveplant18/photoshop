import { ClipboardEvent, HTMLAttributes, useRef, useState } from "react";
import Modal from "@/components/Modal";
import useImageStorage from "@/storages/ImageStorage";
import useUploadImage from "@/hooks/useUploadImage";

function PasteArea({ children }: HTMLAttributes<HTMLElement>) {
  const [isModalShown, setIsModalShown] = useState(false);
  const isImageAlreadyExists = useImageStorage((store) => store.isImageExists);
  const { uploadImage } = useUploadImage();
  const fileRef = useRef<File | null>(null);

  function handlePaste(event: ClipboardEvent<HTMLElement>) {
    if (!event.clipboardData) return;
    for (const i of event.clipboardData.files) {
      if (!i.type.includes("image")) return;
      uploadImageFromClipboard(i);
    }
  }

  function uploadImageFromClipboard(imageFile: File) {
    if (!isImageAlreadyExists) {
      uploadImage(imageFile);
    } else {
      fileRef.current = imageFile;
      setIsModalShown(true);
    }
  }

  return (
    <div onPaste={handlePaste}>
      {children}
      <Modal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        id="confirm-paste"
        controls={
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => {
              setIsModalShown(false);
              uploadImage(fileRef.current!);
            }}
          >
            Ок
          </button>
        }
      >
        Старое изображение будет удалено. Продолжить?
      </Modal>
    </div>
  );
}

export default PasteArea;
