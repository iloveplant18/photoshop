import { Color, ColorType } from "../types/types";
import { cache } from "react";

const formatColor = cache((color: Color): string => {
  if (color.type === ColorType.Hex) {
    return `#${color.value}`;
  }
  return `rgb(${color.value.red} ${color.value.green} ${color.value.blue})`;
});

export default formatColor;
