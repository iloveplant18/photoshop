import calcBrightness from "@/utils/calcBrightness";

export default function updatePixelByNewBrightness(
  index: number,
  brightness: number,
  data: Uint8ClampedArray,
) {
  const oldBrightness = calcBrightness(
    data[index]!,
    data[index + 1]!,
    data[index + 2]!,
  );
  const diff = brightness - oldBrightness;
  data[index] = Math.min(Math.max(data[index]! + diff, 0), 255);
  data[index + 1] = Math.min(Math.max(data[index + 1]! + diff, 0), 255);
  data[index + 2] = Math.min(Math.max(data[index + 2]! + diff, 0), 255);
}
