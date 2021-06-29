import type { PathSegment } from "./PathSegment";

export interface CompoundPath {
  segments: PathSegment[]
  roi: RegionOfInterest
}