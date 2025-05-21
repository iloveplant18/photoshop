import calcBrightness from "@/utils/calcBrightness";

export default function calcBrightnessesByIndexes(
  indexes: number[],
  data: Uint8ClampedArray,
) {
  let result: number[] = [];
  for (let i of indexes) {
    result.push(calcBrightness(data[i]!, data[i + 1]!, data[i + 2]!));
  }
  return result;
}
