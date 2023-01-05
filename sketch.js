let a = {
  x: 200,
  y: 300,
};
let x;
let tl;
function setup() {
  createCanvas(windowWidth, windowHeight);
  tl = new Timeline();
  // pass new prop an object, with key, and animation. in library instead of using the local variable, jsut write directly to reference.
  // create objects for properties we wanna animate
  frameRate(30);
  // add keyframes
  let pp = new PropKeyframes(a, "x", [
    [random(0, width), 800],
    [random(0, width), 900],
    [random(0, width), 1000],
    [200, 600],
  ]);
  let titi = new PropKeyframes(a, "y", [
    [random(0, height), 1000],
    [random(0, height), 1000],
    [random(0, height), 1000],
    [300, 1000],
  ]);

  tl.add(pp).add(titi).animate().loop().setEasing("InOutQuad");
  noStroke();
}

function draw() {
  // update every draw frame
  tl.update();
  background(0, 126);
  fill(255);

  // refer to them in drawing of circle
  circle(a.x, a.y, 50);
}
