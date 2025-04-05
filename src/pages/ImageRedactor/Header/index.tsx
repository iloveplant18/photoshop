import UploadImageButton from "./UploadImageButton";
import SaveImageButton from "./SaveImageButton";
import CenterButton from "./CenterButton";
import ZoomIn from "./ZoomIn";
import ZoomOut from "./ZoomOut";
import ToggleOriginalImage from "./ToggleOriginalImage";
import Undo from "./Undo";
import Redo from "./Redo";

function Header() {
  return (
    <header
      className="relative col-span-full h-fit py-3 px-4 bg-base-300 rounded-xl flex items-center gap-x-2 overflow-x-scroll overflow-y-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <ToggleOriginalImage />
      <div className="border-l-px border-base-100 h-6 min-w-[2px] bg-base-content/10"></div>
      <UploadImageButton />
      <SaveImageButton />
      <div className="border-l-px border-base-100 h-6 min-w-[2px] bg-base-content/10"></div>
      <CenterButton />
      <ZoomIn />
      <ZoomOut />
      <div className="border-l-px border-base-100 h-6 min-w-[2px] bg-base-content/10"></div>
      <Undo />
      <Redo />
    </header>
  );
}

export default Header;
