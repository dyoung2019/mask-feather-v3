import { BSTree } from "typescript-collections";
import type { PathSegment } from "./PathSegment";
import { PathSegmentType } from "./PathSegmentType";

export default function sweepThrough(
    y: number, 
    segments: PathSegment[]
  ): number[] {

  const constructYIntercept = () => {
    return {
      p1: {x: Number.MIN_SAFE_INTEGER, y}, 
      p2: {x: Number.MAX_SAFE_INTEGER, y}, 
    }
  }

  const constructSortedSet = () => {
    const floatCompare = (a: number, b:number) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0
    }

    return new BSTree<number>(floatCompare);
  }

  const orderedSet = constructSortedSet();
  const line = constructYIntercept()

  segments.forEach(seg => {
    switch(seg.type) {
      case PathSegmentType.Quadratic:
      case PathSegmentType.Cubic:
        const curve = seg.curve;
        const points = curve.intersects(line) as number[]

        if (points.length > 0) {
          const vertices = 
            points
              .map(pt => curve.compute(pt))
              .map(result => result.x)
          // console.log('verts', vertices)

          vertices.forEach(vert => {
            orderedSet.add(vert)
          })
        }
        break;
      default:
        throw new Error('path segment type is not found')
    }
  })

  return orderedSet.toArray()
}