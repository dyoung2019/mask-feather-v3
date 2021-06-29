export default function asPixelDimensions(box: PixelSelection): RegionOfInterest {
  const x = Math.floor(box.topLeftX)
  const y = Math.floor(box.topLeftY)
  const bx = Math.ceil(box.bottomRightX)
  const by = Math.ceil(box.bottomRightY)

  return {
    x,
    y,
    width: bx - x,
    height: by - y
  }
}