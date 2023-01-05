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
  x = new Prop(100, 500, 2000); // if easing is not provided, default will be applied
  y = new Prop(50, 500, 2000); // easing is specified: InOutQuint
  frameRate(30);
  pp = new PropObject(a, "x", 500, 1000);
  pp.add(200, 1000);
  // add keyframes
  y.add(290, 2000)
    .add(height - 100, 2000)
    .add(50, 2000);

  tl.add(y).add(pp).animate().loop().setEasing("InOutQuint");
  // loop the properties and animate
}

function draw() {
  // update every draw frame
  x.update();
  y.update();
  pp.update();
  background(0, 126);
  fill(255);

  // refer to them in drawing of circle
  circle(a.x, y.val(), 50);
}
