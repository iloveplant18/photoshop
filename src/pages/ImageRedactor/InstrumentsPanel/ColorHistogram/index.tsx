import IconButton from "@/components/IconButton";
import Popup from "./Popup";
import { useState } from "react";

function ColorHistogram() {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <span className="tooltip tooltip-primary tooltip-top" data-tip="Цвета">
        <IconButton onClick={() => setIsShown(!isShown)}>
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 4H14V20H10V4Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 9H18V20H14V9Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 13H10V20H6V13Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 20H21"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
      </span>
      {isShown && <Popup />}
    </>
  );
}

export default ColorHistogram;
