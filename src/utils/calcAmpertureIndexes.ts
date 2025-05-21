function calcAmpertureIndexes(
  index: number,
  imageWidth: number,
  imageHeight: number,
  radius: number = 1,
): (number | null)[] {
  const pixelY = Math.floor(index / 4 / imageWidth); // Calculate the Y coordinate
  const pixelX = (index / 4) % imageWidth; // Calculate the X coordinate
  const indexes: (number | null)[] = [];

  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      const newPixelY = pixelY + i;
      const newPixelX = pixelX + j;

      // Check if the new pixel coordinates are within the image bounds
      if (
        newPixelY >= 0 &&
        newPixelY < imageHeight &&
        newPixelX >= 0 &&
        newPixelX < imageWidth
      ) {
        const pixelIndex = (newPixelY * imageWidth + newPixelX) * 4; // Calculate the index in the data array
        indexes.push(pixelIndex);
      } else {
        indexes.push(null); // Out of bounds
      }
    }
  }

  return indexes;
}

export default calcAmpertureIndexes;
