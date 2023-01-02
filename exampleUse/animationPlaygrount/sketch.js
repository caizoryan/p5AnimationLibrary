let xValues = [];
let yValues = [];
let colors = [];
let available = [];
let time = 2000;
function setup() {
  available.push(
    color(210, 64, 49),
    color(249, 237, 223),
    color(19, 163, 199),
    color(27, 156, 78)
  );
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 50; i++) {
    colors.push(available[Math.floor(random(available.length))]);
    let startX = random(0, width);
    let startY = random(0, height);
    xValues.push(new Prop(startX, random(0, width), time + random(-500, 500)));
    xValues[i]
      .add(random(0, width), time)
      .add(random(0, width), time)
      .add(startX, time);
    xValues[i].animate();
    yValues.push(
      new Prop(startY, random(0, height), time + random(-500 + 500))
    );
    yValues[i]
      .add(random(0, height), time)
      .add(random(0, height), time)
      .add(startY, time);
    yValues[i].animate();
    xValues[i].loop();
    yValues[i].loop();
  }
  // saveGif("myGif", 10);
  background(255);
}

function draw() {
  fill(255, 0);
  for (let i = 0; i < xValues.length; i++) {
    // stroke(colors[i]);
    stroke(0, random(100));
    xValues[i].update();
    yValues[i].update();
    circle(xValues[i].val(), yValues[i].val(), 1);
  }
}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === "s") {
    saveCanvas("test", "jpeg");
  }
}
