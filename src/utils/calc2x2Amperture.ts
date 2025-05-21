export default function calc2x2AmpertureIndexes(
  index: number,
  imageWidth: number,
  imageHeight: number,
) {
  const positionY = Math.floor(index / 4 / imageWidth);
  const positionX = (index / 4) % imageWidth;
  let pixelsPositions = [
    { x: positionX, y: positionY },
    { x: positionX + 1, y: positionY },
    { x: positionX, y: positionY + 1 },
    { x: positionX + 1, y: positionY + 1 },
  ];

  return pixelsPositions
    .map((position) =>
      position.x >= imageWidth || position.y >= imageHeight ? null : position,
    )
    .map((position) => position && (position.x + position.y * imageWidth) * 4);
}
