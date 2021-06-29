import type { PathSegment } from "./PathSegment.js";

export interface CompoundPath {
  segments: PathSegment[]
  roi: RegionOfInterest
}