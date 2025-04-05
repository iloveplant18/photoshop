import useCanvasStorage from "@/storages/CanvasStorage";
import type { Position, Size } from "@/types/types";
import useImageStorage from "@/storages/ImageStorage";
import useOriginalImageStorage from "@/storages/OriginalImageStorage";

function useUploadImage() {
  const canvas = useCanvasStorage((store) => store.canvas);
  const context = useCanvasStorage((store) => store.context);
  const removeOldImage = useImageStorage((store) => store.removeImage);
  const setImageSize = useImageStorage((store) => store.setSize);
  const setImageData = useImageStorage((store) => store.pushPixels);
  const setImageFormat = useImageStorage((store) => store.setFormat);
  const setOriginalImageSrc = useOriginalImageStorage((store) => store.setSrc);
  const setOriginalImageName = useOriginalImageStorage(
    (store) => store.setName,
  );

  async function uploadImage(imageFile: File) {
    if (!canvas || !context)
      throw new Error("canvas or context are not setted");

    removeOldImage();
    setOriginalImageName(imageFile.name);
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = handleReaderLoad;
  }

  function handleReaderLoad(event: ProgressEvent<FileReader>) {
    if (event.target?.readyState !== FileReader.DONE) return;
    const result = event.target.result;
    if (typeof result === "string") {
      const format = parseImageFormat(result);
      handleImageSrc(result);
      setOriginalImageSrc(result);
      setImageFormat(format ?? "error");
    }
  }

  function parseImageFormat(imagePath: string) {
    return imagePath.match(/data:image\/(.*);/)?.[1];
  }

  async function handleImageSrc(imagePath: string) {
    const image = await createImage(imagePath);
    resizeCanvas(image);
    const coordinatesStart = { x: 0, y: 0 };
    drawImageAtCanvas(image, coordinatesStart);
  }

  async function createImage(imagePath: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const currentImage = new Image();
      currentImage.src = imagePath;
      currentImage.onload = () => resolve(currentImage);
      currentImage.onerror = reject;
    });
  }

  function resizeCanvas(image: HTMLImageElement) {
    const imageSizes: Size = { width: image.width, height: image.height };
    setImageSize(imageSizes);
    setCanvasSize(imageSizes);
  }

  function setCanvasSize(size: Size) {
    canvas!.width = size.width;
    canvas!.height = size.height;
  }

  function drawImageAtCanvas(image: HTMLImageElement, position: Position) {
    context!.drawImage(
      image,
      position.x,
      position.y,
      image.width,
      image.height,
    );
    setImageDataFromContext();
  }

  function setImageDataFromContext() {
    const newImageData = context!.getImageData(
      0,
      0,
      canvas!.width,
      canvas!.height,
    );
    setImageData(newImageData.data);
  }

  return { uploadImage };
}

export default useUploadImage;
