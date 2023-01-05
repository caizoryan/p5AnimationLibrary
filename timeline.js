class Timeline {
  constructor() {
    this.props = [];
  }
  add(prop) {
    this.props.push(prop);
    return this;
  }
  loop() {
    for (const x of this.props) {
      x.loop();
    }
    return this;
  }
  animate() {
    for (const x of this.props) {
      x.animate();
    }
    return this;
  }
  setEasing(easing) {
    for (const x of this.props) {
      x.setEasing(easing);
    }
  }
  update() {
    for (const x of this.props) {
      x.update();
    }
    return this;
  }
}
