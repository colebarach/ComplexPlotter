let canvas;
let theme;

function setup() {
  createCanvas(200,200);
  colorMode(HSB,360,100,100);
  setupCanvas();
}

function draw() {
  canvas.Apply();
  theme.Apply();
  
  recursionFactor = 50;
  infinitySqr = 10;
  
  loadPixels();
  for(y = 0; y < height; y++) {
    for(x = 0; x < width; x++) {
      let hueValue = -1;
      coordinates = canvas.pixelToCanvas(createVector(x,y));
      index = round(x*4 + y*4*width);
      
      // Mandlebrot Variables
      z = new Complex(0,0);
      c = new Complex(coordinates.x,coordinates.y);
      
      // Julia Set Variables
      // mouseCanvasPosition = canvas.pixelToCanvas(createVector(mouseX, mouseY));
      // z = new Complex(coordinates.x, coordinates.y);
      // c = new Complex(mouseCanvasPosition.x, mouseCanvasPosition.y);
      
      for(r = 0; r < recursionFactor; r++) {
        f(z,c);

        if(z.MagnitudeSqr() > infinitySqr) {
          hueValue = 240 * (1 - (r / recursionFactor));
          break;
        }
      }
      if(hueValue == -1) {
        pixels[index]   = 0;
        pixels[index+1] = 0;
        pixels[index+2] = 0;
        pixels[index+3] = 255;
      } else {
        pixels[index]   = red(  color(hueValue,100,100));
        pixels[index+1] = green(color(hueValue,100,100));
        pixels[index+2] = blue( color(hueValue,100,100));
        pixels[index+3] = 255;
      }
    }
  }
  updatePixels();
  
  // drawAxes();
  // drawTicks();
}

// Function to be rendered
function f(z, c) {
  z.Square();
  z.Add(c);
  return z;
}