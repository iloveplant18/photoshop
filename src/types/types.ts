export type Size = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type HexColor = {
  type: ColorType.Hex;
  value: string;
};

export type RGBColor = {
  type: ColorType.RGB;
  value: {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
  };
};

export type Color = HexColor | RGBColor;

export const enum ColorType {
  Hex = "hex",
  RGB = "rgb",
}

export type Statistics = number[];

export type HandleData = (
  index: number,
  data: Uint8ClampedArray,
  originalData: Uint8ClampedArray,
) => void;
