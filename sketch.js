let x;
function setup() {
  createCanvas(windowWidth, windowHeight);
  // create objects for properties we wanna animate
  x = new Prop(100, 500, 2000); // if easing is not provided, default will be applied
  y = new Prop(50, 500, 2000, "InOutQuint"); // easing is specified: InOutQuint
  frameRate(30);

  // add keyframes
  x.add(400, 2000)
    .add(width - 100, 2000)
    .add(100, 2000);
  y.add(290, 2000, "InOutQuint")
    .add(height - 100, 2000, "InOutQuint")
    .add(50, 2000, "InOutQuint");

  // loop the properties and animate
  x.loop();
  x.animate();

  y.loop();
  y.animate();
}

function draw() {
  // update every draw frame
  x.update();
  y.update();
  background(0, 126);
  fill(255);

  // refer to them in drawing of circle
  circle(x.val(), y.val(), 50);
}
