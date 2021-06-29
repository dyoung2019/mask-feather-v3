import type { CompoundPath } from "./CompoundPath";
import scanSegmentsPerRegion from "./scanSegmentsPerRegion";

export default function traceShape(curve: CompoundPath) {
  const rows = scanSegmentsPerRegion(curve.segments, curve.roi);
  return rows;
}