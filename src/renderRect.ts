import type p5 from 'p5'
import type { RenderRectInfo } from './RenderRectInfo';

export default function renderRect(p: p5, info: RenderRectInfo) {
  const {x, y, regionWidth, regionHeight, fillColor} = info

  p.loadPixels();

  const d = p.pixelDensity();
  const screenWidth = p.width

  // on 
  const rowStride = 4 * (screenWidth * d) 
  const xOffset = 4 * d * x;
  const yOffset = d * y
  const realWidth = 4 * d * regionWidth
  const realHeight = d * regionHeight + yOffset

  for(let i = yOffset; i < realHeight; i += 1) {
    const alignment = i * rowStride + xOffset
    for(let j = 0; j < realWidth; j += 4) {
      const loc = alignment + j;

      p.pixels[loc + 0] = p.red(fillColor);
      p.pixels[loc + 1] = p.green(fillColor);
      p.pixels[loc + 2] = p.blue(fillColor);
      p.pixels[loc + 3] = p.alpha(fillColor);
    }
  }

  p.updatePixels();
}