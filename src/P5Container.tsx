import { h } from 'preact';
import { useCallback, useRef } from 'preact/hooks';
import p5 from 'p5';
import { Bezier } from 'bezier-js';

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

          g.noFill();

          g.stroke(0, 0, 0);

          g.bezier(100,25 , 10,90 , 110,100 , 150,195);
          g.bezier(150,195, 250,90 , 110,100 , 350,195);
          g.bezier(350,195, 350,90 , 110,100 , 100,25);

          g.stroke(255, 102, 0);
          g.line(50, 25, 350, 25);
          g.line(50, 195, 350, 195);


          let pink = g.color(255, 102, 204);
          g.loadPixels();
          let d = g.pixelDensity();
          let regionWidth = g.width;
          let regionHeight = g.height / 2;
          let noOfPixels = 4 * (regionWidth * d) * (regionHeight * d);
          let offset = noOfPixels;
          let loopEnd = offset + noOfPixels
          for (let i = offset; i < loopEnd; i += 4) {
            g.pixels[i + 0] = g.red(pink);
            g.pixels[i + 1] = g.green(pink);
            g.pixels[i + 2] = g.blue(pink);
            g.pixels[i + 3] = g.alpha(pink);
          }
          g.updatePixels();
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