import { cache } from "react";

const calcBrightness = cache((r: number, g: number, b: number): number => {
  return 0.3 * r + 0.59 * g + 0.11 * b;
})

export default calcBrightness;
