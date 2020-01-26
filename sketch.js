var scl, dim = 6;
var w, h, canvas, looping = true;
var angle = 0.0;
var posx = [];
var posy = [];
var old_posx = [];
var old_posy = [];
var show = false;
var ran = [];
var randomize = true;

function setup() {
  smooth()
  lim=floor(min(windowHeight,windowWidth))
  len = (lim-100) / (dim + 1)
  if(lim==floor(windowWidth)){
    len = (lim) / (dim + 1)

  }
  w = floor(dim * len)
  canvas = createCanvas(w, w);
  // canvas.position((windowWidth - w) / 2, (windowHeight - w) / 2)
  canvas.id("game")
  canvas.parent("game-container")


  if (randomize) {
    ran.splice(0, ran.length)
    for (var i = 0; i < dim; i++) {
      var r = random(10)
      ran.push(r / 10);
    }
    console.table(ran)
  }

}

function draw() {
  if (show)
    background(51);

  for (i = 0; i < dim; i++) {
    if (show) {
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

    if (show) {
      ellipse(cx, cy, d, d)
      ellipse(cy, cx, d, d)
    }

    if (random)
      var ang = angle * (ran[i] * (i + 1)) + ran[i]
    else
      var ang = angle * (i + 1)


    var x = r * cos(ang);
    var y = r * sin(ang);

    if (show) {
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

  // console.log(posx);

  if (!show) {
    strokeWeight(.1)

    // let noiseVal = noise(frameCount);
    // console.log(noiseVal);
    
    // stroke(noiseVal*100,noiseVal*255,noiseVal*120);
    stroke(250)
    for (i = 0; i < dim; i++) {
      for (j = 0; j < dim; j++) {
        // let easing=0.1
        // let xxx=old_posx[i]
        // let yyy=old_posy[j]
        // let targetX = posx[i]
        // let targetY = posy[j]
        // xxx += (targetX - old_posx[i]) * easing;
        // yyy += (targetY - old_posy[j]) * easing;
        // line(targetX,targetY,xxx, yyy)
        line(old_posx[i], old_posy[j], posx[i], posy[j])
        // point(posx[i], posy[j])
      }
    }
    old_posx = posx;
    old_posy = posy;
    posx.splice(0, posx.length)
    posy.splice(0, posy.length)
  }

  // if (angle > TWO_PI) {
  //   posx.splice(0, posx.length)
  //   posy.splice(0, posy.length)
  //   angle = 0;
  //   clear()
  // }
  angle += 0.02;

  // push()
  // strokeWeight(0)
  // textAlign(RIGHT)
  // textSize(20)
  // fill(255, 255, 255, 100)
  // text(frameRate().toFixed(0), width-10, 20)
  // pop()

}


function p_pause(){
  if (looping) {
    looping = false;
    noLoop()
  } else {
    looping = true;
    loop()
  }
}

function change_animation(){
  if (show) {
    show = false;
  } else {
    show = true;
  }
  clear();
}

function reset() {
  
  show = false;
  clear();
  setup()
  draw()

}
function save_img(){
  saveCanvas("lissajous",'png')
}

function inc_dec(v=1){
  dim+=v;
  clear();
  setup()
  draw()
}

function randomize_(){
  if (randomize) {
    randomize = false;
  } else {
    randomize = true;
  }
  clear();
  setup()
  draw()
}
function keyPressed() {
  if (key === 'p' || key === 'P') {
    p_pause()
  }
  if (key === 'd' || key === 'D') {
    change_animation()
  }
  if (key === 'x' || key === 'X') {
reset()
  }
  if (key === '+' || key === '=') {

   inc_dec(1)
   
  }
  if (key === '-' || key === '_') {
    inc_dec(-1)


  }
  if (key === 'r' || key === 'R') {
    randomize_()
  }
}