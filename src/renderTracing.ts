import type p5 from 'p5'
import type { CompoundPath } from './CompoundPath';
import type { PathSegment } from './PathSegment';

export default function renderTracing(p: p5, tracing: RasterScanLine[]) {

  const fillColor = p.color('tomato')
  const backColor = p.color('purple')
  const d = p.pixelDensity();
  const screenWidth = p.width

  const traceLineSegment = (y: number, span: RasterSpan) => {
    const { 
      start,
      length,
      count,
    } = span;
 
    const x = Math.floor(start);
    const regionWidth = Math.ceil(length);
    const regionHeight = 1
    // even-odd
    const lineColor = count % 2 !== 0 
      ? fillColor
      : backColor;

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

        p.pixels[loc + 0] = p.red(lineColor);
        p.pixels[loc + 1] = p.green(lineColor);
        p.pixels[loc + 2] = p.blue(lineColor);
        p.pixels[loc + 3] = p.alpha(lineColor);
      }
    }
  }

  const fillShape = () => {
    tracing.forEach(line => {
      line.spans.forEach(span => traceLineSegment(line.y, span))
    })
  }

  p.loadPixels();
  fillShape()
  p.updatePixels();
}