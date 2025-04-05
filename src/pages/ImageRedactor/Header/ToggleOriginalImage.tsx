import useOriginalImageStorage from "@/storages/OriginalImageStorage";
import useImageStorage from "@/storages/ImageStorage";

function ToggleOriginalImage() {
  const isOriginalImageShown = useOriginalImageStorage(
    (store) => store.isShown,
  );
  const setIsOriginalImageShown = useOriginalImageStorage(
    (store) => store.setIsShown,
  );
  const isImageExists = useImageStorage((store) => store.isImageExists);

  return (
    <span className="text-sm align-base text-nowrap">
      Оригинал
      <input
        type="checkbox"
        className="ml-2 toggle checked:toggle-primary"
        checked={isOriginalImageShown}
        onChange={() => setIsOriginalImageShown(!isOriginalImageShown)}
        disabled={!isImageExists}
      />
    </span>
  );
}

export default ToggleOriginalImage;
