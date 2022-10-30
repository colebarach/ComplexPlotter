function setupCanvas() {
  canvas = new Canvas(-2,  2,  //x
                       2, -2); //y
   
  theme = new Theme();
  theme.backgroundColor = color(0);
  theme.strokeColor = color(255);
  theme.strokeWeight = 1/128;
  theme.xAxisColor = color(255,127,127);
  theme.yAxisColor = color(127,255,127);
  theme.tickSubdivisions = 4;
  theme.tickHeight = 1/16;
}

function drawAxes() {
  stroke(theme.xAxisColor);
  line(canvas.lowerBounds.x,0,canvas.upperBounds.x,0);
  stroke(theme.yAxisColor);
  line(0,canvas.lowerBounds.y,0,canvas.upperBounds.y);
  stroke(theme.strokeColor);
}
function drawTicks() {
  for(x = round(canvas.lowerBounds.x*theme.tickSubdivisions)*theme.tickSubdivisions; x <= canvas.upperBounds.x; x += 1/theme.tickSubdivisions) {
    heightMultiplier = 0;
    if(x<0) heightMultiplier = x/floor(x);
    if(x>0) heightMultiplier = x/ceil(x);
    if(heightMultiplier != 1) heightMultiplier = 1/2;
    line(x,-theme.tickHeight*heightMultiplier,x,theme.tickHeight*heightMultiplier);
  }
  for(y = round(canvas.upperBounds.y*theme.tickSubdivisions)*theme.tickSubdivisions; y <= canvas.lowerBounds.y; y += 1/theme.tickSubdivisions) {
    heightMultiplier = 0;
    if(y<0) heightMultiplier = y/floor(y);
    if(y>0) heightMultiplier = y/ceil(y);
    if(heightMultiplier != 1) heightMultiplier = 1/2;
    line(-theme.tickHeight*heightMultiplier,y,theme.tickHeight*heightMultiplier,y);
  }
}
function mouseDragged() {
  let pixelCoordinates  = createVector(mouseX, mouseY);
  let ppixelCoordinates = createVector(pmouseX,pmouseY);
  let canvasCoordinates = canvas.pixelToCanvas(pixelCoordinates);
  let pcanvasCoordinates = canvas.pixelToCanvas(ppixelCoordinates);
  pcanvasCoordinates.sub(canvasCoordinates)
  canvas.Translate(pcanvasCoordinates);
}
function mouseWheel(event) {
  let scroll = event.delta;
  let scrollFactor = 1/100;
  let mouseCanvasPosition = canvas.pixelToCanvas(createVector(mouseX, mouseY));
  canvas.upperBounds.sub(mouseCanvasPosition);
  canvas.lowerBounds.sub(mouseCanvasPosition);
  canvas.upperBounds.mult(abs(1+(scroll*scrollFactor/2)));
  canvas.lowerBounds.mult(abs(1+(scroll*scrollFactor/2)));
  canvas.upperBounds.add(mouseCanvasPosition);
  canvas.lowerBounds.add(mouseCanvasPosition);
}

class Canvas {
  constructor(xLower, xUpper, yLower, yUpper) {
    this.lowerBounds = createVector(xLower, yLower);
    this.upperBounds = createVector(xUpper, yUpper);
  }
  Apply() {
    scale(width,height);
    scale(1/this.xRange,1/this.yRange);
    translate(-this.lowerBounds.x,-this.lowerBounds.y);
  }
  pixelToCanvas(coordinates) {
    return this.unitToCanvas(this.pixelToUnit(coordinates));
  }
  pixelToUnit (coordinates) {
    coordinates.x /= width;
    coordinates.y /= height;
    return coordinates;
  }
  unitToCanvas (coordinates) {
    coordinates.x *= this.xRange;
    coordinates.y *= this.yRange;
    coordinates.x += this.lowerBounds.x;
    coordinates.y += this.lowerBounds.y;
    return coordinates;
  }
  
  Translate(offset) {
    this.lowerBounds.add(offset);
    this.upperBounds.add(offset);
  }
  
  get xRange() {
    return this.upperBounds.x - this.lowerBounds.x;
  }
  get yRange() {
    return this.upperBounds.y - this.lowerBounds.y;
  }
}
class Theme {
  Apply() {
    background(this.backgroundColor);
    fill(this.backgroundColor);
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeight);
  }
}