import type { PathSegmentType } from "./PathSegmentType";

export type PathSegment =
  | { type: PathSegmentType.Point, points: []}
  | { type: PathSegmentType.Line, points: []}
  | { type: PathSegmentType.Quadratic, curve: any }
  | { type: PathSegmentType.Cubic, curve: any}