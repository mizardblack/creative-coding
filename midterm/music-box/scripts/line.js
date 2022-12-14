class LineGroup {
  constructor(length, number) {
    this.x = 0; // Xposition of signle line ending point
    this.y = 0; // Yposition of signle line ending point
    this.l = length; // single line length
    this.offset = 1;
    this.n = number; // number of bars
    this.color = color(235, 131, 131); //red
  }

  amplify(vol, input) {
    let intensity = map(input, 473, 621, 5000, 50);
    this.offset = vol * intensity;
  }

  display() {
    noFill();
    strokeWeight(0.5);
    stroke(this.color);
    for (let i = 0; i < this.n; i++) {
      push();
      this.l = random(60);
      rotate(radians((360 / this.n) * i));
      line(0, this.offset + this.l, 0, this.offset);
      pop();
    }
  }
}
