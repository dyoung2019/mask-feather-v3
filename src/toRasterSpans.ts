export default function toRasterSpans(intersections: number[]): RasterSpan[] {
  const spans = []
  for(let k = 0; k < intersections.length - 1; k += 1) {
    const start = intersections[k]
    const end = intersections[k + 1]
    const line = { 
      count: k + 1, 
      start,
      end,
      length: end - start,
    }
    spans.push(line)
  }
  return spans
}