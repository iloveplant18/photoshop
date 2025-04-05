import useCanvasStorage from "@/storages/CanvasStorage";
import useImageStorage from "@/storages/ImageStorage";
import useOriginalImageStorage from "@/storages/OriginalImageStorage";

function SaveImageButton() {
  const canvas = useCanvasStorage((store) => store.canvas);
  const isImageExists = useImageStorage((store) => store.isImageExists);
  const imageFormat = useImageStorage((store) => store.format);
  const originalImageName = useOriginalImageStorage((store) => store.name);

  function saveImageFromCanvas() {
    const image = canvas?.toDataURL(`image/${imageFormat}`);
    if (!image) throw new Error("Error when saving image");
    const downloadLink = document.createElement("a");
    downloadLink.href = image;
    downloadLink.download = originalImageName;
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }

  return (
    <>
      <button
        className="btn btn-sm btn-primary btn-soft"
        disabled={!isImageExists}
        onClick={saveImageFromCanvas}
      >
        Сохранить
      </button>
    </>
  );
}

export default SaveImageButton;
