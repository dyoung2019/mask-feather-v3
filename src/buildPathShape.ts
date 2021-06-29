import asPixelDims from "./asPixelDimensions";
import unionBoundingBoxes from "./unionBoundingBoxes";
import { Bezier } from "bezier-js";
import { PathSegmentType } from "./PathSegmentType";

export default function buildPathShape() {
  const generateRegion = (paths: any[]) => {
    const boxes = paths.map(c => c.bbox())
    const selection = unionBoundingBoxes(boxes)
    return asPixelDims(selection)
  }

  const generateSegments = (paths: any[]) =>  {
    return paths.map(path => {
      return {type: PathSegmentType.Cubic, curve: path}
    })
  }

  const ptA = { x: 100, y: 25 }
  const ptA1 = { x: 10, y: 90 }
  const ptA2 = { x: 110, y: 100 }
  const ptB = { x: 150, y: 195 }
  const ptB1 = { x: 250, y: 90 }
  const ptB2 = { x: 110, y: 100 }
  const ptC = { x: 350, y: 195 }
  const ptC1 = { x: 350, y: 90 }
  const ptC2 = { x: 110, y: 100 }

// segments
  // START ANCHOR_0 ANCHOR_2 END CUBIC
  const curves = [
    new Bezier([ptA, ptA1, ptA2, ptB]),
    new Bezier([ptB, ptB1, ptB2, ptC]),
    new Bezier([ptC, ptC1, ptC2, ptA]),
  ]

  // return {}

  return {
    segments: generateSegments(curves),
    roi: generateRegion(curves)
  }
}