var scl, dim, w, h, canvas, looping = true;

var posx = [];
var posy = [];
var show=false;
function setup() {
  dim = 5
  len = windowHeight / (dim + 1)
  w = floor(dim * len)
  canvas = createCanvas(w, w);
  canvas.position((windowWidth - w) / 2, (windowHeight - w) / 2)
  canvas.id("game")
  canvas.parent("game-container")
  // loop();  
}
var angle = 0.0;
function draw() {
  if(show)
  background(51);
  //makes lines
  // frameRate(1)
  for (i = 0; i < dim; i++) {
    if(show){
    stroke(255, 50)
    strokeWeight(1)


    line(len * (i + 1), 0, len * (i + 1), w)
    line(0, len * (i + 1), w, len * (i + 1))

    noFill()
    stroke(255, 100)
    strokeWeight(3)
  }

    var cx = (i + 1) * len + len / 2;
    var cy = len / 2;
    var d = len / 1.2;
    var r = d / 2;

    if(show){
    ellipse(cx, cy, d, d)
    ellipse(cy, cx, d, d)
    }

    var x = r * cos(angle * (i + 1));
    var y = r * sin(angle * (i + 1));


    if(show){
      stroke(255, 255)
      strokeWeight(5)
      point(cx + x, cy + y)
      point(cy + x, cx + y)
      stroke(255, 255, 0, 100)
      strokeWeight(1)
      line(cx + x, 0, cx + x, w)
      line(0, cx + y, w, cx + y)
      stroke(255)
      strokeWeight(4)
    }



    posx.push(cx + x)
    posy.push(cx + y)

  }
  strokeWeight(6)
  draww();
  if(draw){
  for (i = 0; i < dim; i++) {
    for (j = 0; j < dim; j++) {
      point(posx[i], posy[j])
    }
  }

  posx.splice(0, posx.length)
  posy.splice(0, posy.length)
}
  
  if (angle > TWO_PI) {
    posx.splice(0, posx.length)
    posy.splice(0, posy.length)
    angle=0;
    clear()
  }
  angle += 0.01;
}

function draww() {
  strokeWeight(2)
  stroke(250)
  
  for (i = 0; i < posx.length; i++) {
    // beginShape();
    for (j = 0; j < posy.length; j++) {
      
      // vertex(posx[i], posy[j])
      
      point( posx[i], posy[j])
    }
    // endShape();
  }
 
}

function keyPressed() {
  if (key === 'p'||key==='P') {
    if (looping) {
      looping = false;
      noLoop()
    } else {
      looping = true;
      loop()
    }
  }
  if (key === 'd'|| key==='D') {
    if (show) {
      show = false;
      clear();
    } else {
      show = true;
      clear();
    }
  }
}