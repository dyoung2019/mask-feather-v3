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

  const renderRect = (p: any, info: any) => {
    const {x, y, regionWidth, regionHeight, fillColor} = info

    p.loadPixels();

    const d = p.pixelDensity();
    const screenWidth = p.width

    // on 
    const rowStride = 4 * (screenWidth * d) 
    const xOffset = 4 * d * x;
    const yOffset = d * y
    const realWidth = 4 * d * regionWidth
    const realHeight = d * regionHeight + yOffset

    for(let i = yOffset; i < realHeight; i += 1) {
      const alignment = i * rowStride + xOffset
      for(let j = 0; j < realWidth; j += 4) {
        const loc = alignment + j;

        p.pixels[loc + 0] = p.red(fillColor);
        p.pixels[loc + 1] = p.green(fillColor);
        p.pixels[loc + 2] = p.blue(fillColor);
        p.pixels[loc + 3] = p.alpha(fillColor);
      }
    }

    p.updatePixels();
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

          const screenWidth = g.width
          const screenHeight = g.height
        
          const info = {
            x: 50,
            y: 25,
            regionWidth: 100,
            regionHeight: 100,
            fillColor: pink
          }

          // fill path
          renderRect(g, info)
  
          // g.loadPixels();

          // // on 
          // const rowStride = 4 * (screenWidth * d) 
          // const xOffset = 4 * d * x;
          // const yOffset = d * y
          // const realWidth = 4 * d * regionWidth
          // const realHeight = d * regionHeight + yOffset

          // for(let i = yOffset; i < realHeight; i += 1) {
          //   const alignment = i * rowStride + xOffset
          //   for(let j = 0; j < realWidth; j += 4) {
          //     const loc = alignment + j;

          //     g.pixels[loc + 0] = g.red(pink);
          //     g.pixels[loc + 1] = g.green(pink);
          //     g.pixels[loc + 2] = g.blue(pink);
          //     g.pixels[loc + 3] = g.alpha(pink);
          //   }
          // }

          // g.updatePixels();



          g.line(100, 25, 100, screenHeight/ 2);

          g.line(0, screenHeight/ 2, screenWidth, screenHeight/ 2);

          g.push();
          // path match
          g.translate(0, screenHeight/ 2)

          g.noFill();

          g.stroke(0, 0, 0);

          g.bezier(100,25 , 10,90 , 110,100 , 150,195);
          g.bezier(150,195, 250,90 , 110,100 , 350,195);
          g.bezier(350,195, 350,90 , 110,100 , 100,25);

          g.stroke(255, 102, 0);
          g.line(50, 25, 350, 25);
          g.line(50, 195, 350, 195);

          g.pop();
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