import { ChangeEvent, InputHTMLAttributes } from "react";
import useUploadImage from "@/hooks/useUploadImage";

type DropboxProps = InputHTMLAttributes<any>;

function Dropbox({ className, type, ...props }: DropboxProps) {
  const { uploadImage } = useUploadImage();

  function handleOnChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    uploadImage(file);
  }

  return (
    <div
      className={`flex justify-center items-center ${className}`}
      onDragOver={() => {}}
    >
      <div className="py-5! block h-fit px-7 border border-primary rounded-md bg-primary/20">
        <label className="text-primary-content flex items-center gap-x-3 btn btn-primary btn-xl">
          <input
            className="hidden"
            onChange={handleOnChange}
            type={type ?? "file"}
            {...props}
          />
          <span>Загрузите файл</span>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 17H17.01M15.6 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H8.4M12 15V4M12 4L15 7M12 4L9 7"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
        <div className="text-center mt-2 text-xl text-primary">
          или перетащите его в браузер
        </div>
      </div>
    </div>
  );
}

export default Dropbox;
