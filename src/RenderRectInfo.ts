import type p5 from 'p5'

export interface RenderRectInfo {
  x: number;
  y: number;
  regionWidth: number,
  regionHeight: number,
  fillColor: p5.Color;
}