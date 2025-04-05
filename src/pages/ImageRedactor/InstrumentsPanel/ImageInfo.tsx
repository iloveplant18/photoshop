import useImageStorage from "@/storages/ImageStorage";

function ImageInfo() {
  const { width, height } = useImageStorage((store) => store.size);
  const imageFormat = useImageStorage((store) => store.format);

  return (
    <div className="text-xs">
      <div>ширина:&nbsp;{width ?? 0}</div>
      <div>высота:&nbsp;{height ?? 0}</div>
      <div>расширение:&nbsp;{imageFormat}</div>
    </div>
  );
}

export default ImageInfo;
