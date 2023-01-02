let x;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = new Prop(100, 500, 2000);
  y = new Prop(50, 500, 2000, "InOutQuint");
  frameRate(30);
  x.add(400, 2000)
    .add(width - 100, 2000)
    .add(100, 2000);
  y.add(290, 2000, "InOutQuint")
    .add(height - 100, 2000, "InOutQuint")
    .add(50, 2000, "InOutQuint");

  x.loop();
  x.animate();

  y.loop();
  y.animate();
}

function draw() {
  x.update();
  y.update();
  background(0, 126);
  fill(255);
  circle(x.val(), y.val(), 50);
}

class Prop {
  constructor(start, end, duration, easing = "InOutQuad") {
    this.isActive = false;
    this.isLooping = false;
    this.keyframes = [];
    this.currentValue = 0;
    this.elapsedTime = 0;

    this.activeMotion = 0;
    this.keyframes.push({
      start: start,
      end: end,
      duration: duration,
      easing: easing,
    });
  }
  animate() {
    this.isActive = true;
  }
  interpolation(start, end, amt, easing) {
    let easingFunction = !(easing in Easings)
      ? Easings["linear"]
      : Easings[easing];
    return easingFunction(amt) * (end - start) + start;
  }
  update() {
    // check if need to update at all, or if need to stop
    if (!this.isActive) return;
    if (this.elapsedTime >= this.keyframes[this.activeMotion].duration) {
      if (this.activeMotion < this.keyframes.length - 1) {
        this.activeMotion++;
        this.elapsedTime = 0;
      } else {
        // animation has ended, if not looping end it.
        if (this.isLooping) {
          this.activeMotion = 0;
          this.elapsedTime = 0;
        } else this.isActive = false;
        return;
      }
    }

    // add time to elapsed time
    this.elapsedTime += deltaTime;
    let motion = this.keyframes[this.activeMotion];
    // calculate progress
    let progress = this.elapsedTime / motion.duration;

    let start = motion.start;
    let end = motion.end;
    let easing = motion.easing;
    // update the animation
    this.currentValue = this.interpolation(start, end, progress, easing);
  }
  add(end, duration, easing = "InOutQuad") {
    this.keyframes.push({
      start: this.keyframes[this.keyframes.length - 1].end,
      end: end,
      duration: duration,
      easing: easing,
      complete: false,
    });
    return this;
  }

  loop() {
    this.isLooping = true;
  }
  val() {
    return this.currentValue;
  }
}

const Easings = {
  // no easing, no acceleration
  linear: (t) => t,
  // accelerating from zero velocity
  InQuad: (t) => t * t,
  // decelerating to zero velocity
  OutQuad: (t) => t * (2 - t),
  // acceleration until halfway, then deceleration
  InOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  InCubic: (t) => t * t * t,
  // decelerating to zero velocity
  OutCubic: (t) => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  InOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  InQuart: (t) => t * t * t * t,
  // decelerating to zero velocity
  OutQuart: (t) => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  InOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // accelerating from zero velocity
  InQuint: (t) => t * t * t * t * t,
  // decelerating to zero velocity
  OutQuint: (t) => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  InOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};
