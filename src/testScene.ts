import type p5 from "p5";

export default function testScene(g: p5) {
  const screenWidth = g.width
  const screenHeight = g.height

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