export default function unionBoundingBoxes(boxes: any[]) {
  const firstBox = boxes[0]
  let topLeftY = firstBox.y.min;
  let topLeftX = firstBox.x.min;
  let bottomRightX = firstBox.x.max;
  let bottomRightY = firstBox.y.max;

  const extendX = (box: any) => {
    // update if less
    const minX = box.x.min
    if (minX < topLeftX) {
      topLeftX = minX
    }

    const maxX = box.x.max
    if (maxX > bottomRightX) {
      bottomRightX = maxX;
    }
  }

  const extendY = (box: any) => {
    const minY = box.y.min
    if (minY < topLeftY) {
      topLeftY = minY
    }

    const maxY = box.y.max
    if (maxY > bottomRightY) {
      bottomRightY = maxY;
    }
  }

  for (let i = 1; i < boxes.length; i += 1) {
    const current = boxes[i]
    extendX(current)
    extendY(current)
  }

  return {
    topLeftX,
    topLeftY,
    bottomRightX,
    bottomRightY
  }
}