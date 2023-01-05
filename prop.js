class Prop {
  constructor(start, end, duration, easing = "InOutQuad") {
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
    // check if need to update at all, or if need to stop
    if (!this.isActive) return;
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
        return;
      }
    }

    // add time to elapsed time
    this.elapsedTime += deltaTime;
    motion = this.keyframes[this.activeMotion];
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
  setEasing(easing) {
    for (const x of this.keyframes) {
      x.easing = easing;
    }
  }
}

class PropObject {
  constructor(obj, key, end, duration, easing = "InOutQuad") {
    this.isActive = false;
    this.isLooping = false;
    this.keyframes = []; // all the keyframes are stored here
    this.elapsedTime = 0; // elapsed time after start of each animation, on completion of an animation this is set to 0

    this.activeMotion = 0; // holds the index of current keyframe
    this.obj = obj;
    this.key = key;
    // initialise the first keyframe
    this.keyframes.push({
      start: obj[key],
      end: end,
      duration: duration,
      easing: easing,
    });
  }
  update() {
    // check if need to update at all, or if need to stop
    if (!this.isActive) return;
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
        return;
      }
    }

    // add time to elapsed time
    this.elapsedTime += deltaTime;
    motion = this.keyframes[this.activeMotion];
    // calculate progress
    let progress = this.elapsedTime / motion.duration;
    let start = motion.start;
    let end = motion.end;
    let easing = motion.easing;

    // update the animation
    this.obj[this.key] = this.interpolation(start, end, progress, easing);
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
  setEasing(easing) {
    for (const x of this.keyframes) {
      x.easing = easing;
    }
  }
}
