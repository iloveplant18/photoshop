import type { Color } from "@/types/types";
import { ColorType } from "@/types/types";

function transformRgbToColorType(
  colorType: ColorType,
  red: number,
  green: number,
  blue: number,
  alpha?: number,
): Color {
  if (colorType == ColorType.Hex) {
    return RgbToHex(red, green, blue, alpha);
  }
  return {
    type: ColorType.RGB,
    value: {
      red: red,
      green: green,
      blue: blue,
      alpha: alpha,
    },
  };
}

function RgbToHex(
  red: number,
  green: number,
  blue: number,
  alpha?: number,
): Color {
  let value = [red, green, blue, alpha];
  let colorString = value
    .map((item) => convertToColorNumber(item))
    .join("")
    .toUpperCase();
  return {
    type: ColorType.Hex,
    value: colorString,
  };
}

function convertToColorNumber(num?: number) {
  let hexNum = num?.toString(16);
  if (hexNum?.length === 1) hexNum = "0" + hexNum;
  return hexNum;
}

export default transformRgbToColorType;
