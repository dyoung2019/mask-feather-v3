import { h } from 'preact';
import { useCallback, useRef } from 'preact/hooks';
import p5 from 'p5';
import renderRect from './renderRect';
import testScene from './testScene';

export default function P5Container() {
  const graphics = useRef<p5|null>();
  const containerRef = useRef<HTMLElement|null>();

  const disposeContext = () => {
    console.log('rtx found - dispose');
    const container = containerRef.current;
    const rtx = graphics.current;
    if (!!container && !!rtx) {
      console.log('disposing');
      rtx.remove();
      graphics.current = null;
      // containerRef.current = null;
    }
  }

  const domRef = useCallback((node: HTMLElement|null) =>{
    if (node !== null) {

      // if (containerRef.current !== null) {
      //   return; 
      // }
      containerRef.current = node;

      const sketch = (g: p5) => {
        g.setup = () => {
          g.createCanvas(400, 400);
        }
        
        g.draw = () => {
          g.background(220);

          let pink = g.color(255, 102, 204);
 
          let d = g.pixelDensity();

      
          const info = {
            x: 50,
            y: 25,
            regionWidth: 100,
            regionHeight: 100,
            fillColor: pink
          }

          // fill path
          renderRect(g, info)
          testScene(g)
        }
      }

      const lem = new p5(sketch, node)
      graphics.current = lem;
    } 
    else {
      console.log('doInit null - not yet');
      disposeContext();
    }
  }, [])

  return (
    <div ref={domRef}>
        AA
    </div>
  )
}