class Prop {
  constructor(start, end, duration, easing = "Linear") {
    this.isActive = false;
    this.isLooping = false;
    this.keyframes = []; // all the keyframes are stored here
    this.currentValue = 0; // the value of the property, constantly changing every update
    this.elapsedTime = 0; // elapsed time after start of each animation, on completion of an animation this is set to 0

    this.activeMotion = 0; // holds the index of current keyframe

    // initialise the first keyframe
    this.keyframes.push({
      start: start,
      end: end,
      duration: duration,
      easing: easing,
    });
    console.log(this.keyframes);
  }

  animate() {
    this.isActive = true;
  }

  // interpolate based on easing function. If easing function doesn't exist, use linear
  interpolation(start, end, amt, easing) {
    let easingFunction = !(easing in Easings)
      ? Easings["linear"]
      : Easings[easing];
    return easingFunction(amt) * (end - start) + start;
  }

  update() {
    if (!this.runChecks()) return;

    // add time to elapsed time
    this.elapsedTime += deltaTime;

    // update the animation
    this.currentValue = this.calculate(this.keyframes[this.activeMotion]);
  }
  runChecks() {
    // RUN ALL THE CHECKS
    // x - x - x

    // check if need to update at all, or if need to stop
    if (!this.isActive) return false;
    // set motion as current keyframe
    let motion = this.keyframes[this.activeMotion];
    // check if elapsed time is more than animation duration
    if (this.elapsedTime >= motion.duration) {
      // check which keyframe we are at, if there is more after this, continue, else stop
      if (this.activeMotion < this.keyframes.length - 1) {
        this.activeMotion++;
        this.elapsedTime = 0;
      } else {
        // animation has ended, if not looping end it.
        if (this.isLooping) {
          this.activeMotion = 0;
          this.elapsedTime = 0;
        } else this.isActive = false;
        return false;
      }
    }
    return true;
  }
  calculate(motion) {
    // do all calculations
    let progress = this.elapsedTime / motion.duration;
    let start = motion.start;
    let end = motion.end;
    let easing = motion.easing;
    return this.interpolation(start, end, progress, easing);
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
  setEasing(easing) {
    for (const x of this.keyframes) {
      x.easing = easing;
    }
  }
}

class PropObject extends Prop {
  constructor(obj, key, end, duration, easing = "Linear") {
    super(obj[key], end, duration, easing);
    this.obj = obj;
    this.key = key;
  }
  update() {
    if (!this.runChecks()) return;

    // add time to elapsed time
    this.elapsedTime += deltaTime;

    // update the animation
    this.obj[this.key] = this.calculate(this.keyframes[this.activeMotion]);
  }
}

class PropKeyframes extends PropObject {
  constructor(obj, key, keyframes, easing = "Linear") {
    if (keyframes[0].length === 2)
      super(obj, key, keyframes[0][0], keyframes[0][1], easing);
    if (keyframes[0].length === 3)
      super(obj, key, keyframes[0][0], keyframes[0][1], keyframes[0][2]);
    this.obj = obj;
    this.key = key;
    this.addKeyframes(keyframes, easing);
  }
  addKeyframes(keyframes, easing) {
    for (let i = 1; i < keyframes.length; i++) {
      if (keyframes[i].length === 2)
        this.add(keyframes[i][0], keyframes[i][1], easing);
      if (keyframes[i].length === 3)
        this.add(keyframes[i][0], keyframes[i][1], keyframes[i][2]);
    }
  }
}
