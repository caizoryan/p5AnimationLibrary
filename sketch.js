let a = {
  x: 200,
  y: 300,
};
let tl;
function setup() {
  createCanvas(windowWidth, windowHeight);
  tl = new Timeline();

  let pp = new PropKeyframes(a, "x", [
    [random(0, width), random(800, 2000)],
    [random(0, width), random(800, 2000)],
    [random(0, width), random(800, 2000)],
    [200, 600],
  ]);

  let titi = new PropKeyframes(a, "y", [
    [random(0, height), random(800, 2000)],
    [random(0, height), random(800, 2000)],
    [random(0, height), random(800, 2000)],
    [300, 1000],
  ]);

  tl.add(pp).add(titi).animate().loop().setEasing("InOutCubic");
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
