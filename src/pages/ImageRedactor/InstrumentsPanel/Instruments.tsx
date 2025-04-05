import { memo } from "react";
import Binarization from "./Binaryzation";
import BlackAndWhite from "./BlackAndWhite";
import Brightness from "./Brightness";
import ColorHistogram from "./ColorHistogram";
import Contrast from "./Contrast";
import CurrentPixel from "./CurrentPixel";
import ImageInfo from "./ImageInfo";
import Invert from "./Invert";

const Instruments = memo(() => {
  return (
    <ul className="list grow">
      <li>
        <h3 className="text-xl text-center">Фильтры</h3>
        <ul className="mt-1 grid grid-cols-4 gap-2 justify-items-center">
          <li>
            <BlackAndWhite />
          </li>
          <li>
            <Invert />
          </li>
          <li>
            <Binarization />
          </li>
          <li>
            <Brightness />
          </li>
          <li>
            <Contrast />
          </li>
        </ul>
      </li>
      <li>
        <h3 className="text-xl text-center">Информация</h3>
        <ul className="mt-1 grid grid-cols-4 gap-2 justify-items-center">
          <li>
            <ColorHistogram />
          </li>
        </ul>
      </li>
      <li className="mt-auto">
        <CurrentPixel />
      </li>
      <li>
        <ImageInfo />
      </li>
    </ul>
  );
});

export default Instruments;
