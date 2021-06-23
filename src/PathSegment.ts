import type { default as BezierJs } from 'bezier-js'

export type PathSegment =
  | { type: PathSegmentType.Point, points: []}
  | { type: PathSegmentType.Line, points: []}
  | { type: PathSegmentType.Quadratic, curve: BezierJs.Bezier }
  | { type: PathSegmentType.Cubic, curve: BezierJs.Bezier }