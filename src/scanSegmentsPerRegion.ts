import type { PathSegment } from "./PathSegment";
import sweepThrough from "./sweepThrough";
import toRasterSpans from "./toRasterSpans";

export default function scanSegmentsPerRegion(
  segments: PathSegment[],
  roi: RegionOfInterest) : RasterScanLine[] {
  const chunks = []

  for (let i = 0; i < roi.height; i += 1) {
    const y = i + roi.y
    const intersections = sweepThrough(y, segments)
    const chunk = {
      y,
      spans: toRasterSpans(intersections),
    }
    chunks.push(chunk)
  }
  return chunks
}