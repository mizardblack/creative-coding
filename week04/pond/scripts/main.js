let waterColor, leafColor;
let ripples = [];

function setup() {
  createCanvas(400, 400);
  waterColor = color(182, 201, 185);
  leafColor = color(90, 140, 127);
}

function draw() {
  background(waterColor);

  ripples.forEach((ripple) => {
    ripple.display();
  });

  noStroke();
  fill(leafColor);
  circle(100, 200, 50);
  fill(waterColor);
  arc(100,200, 50,50, PI + QUARTER_PI, PI+HALF_PI);
}

function mousePressed() {
  makeNewRipple();
}

function makeNewRipple() {
  let newRipple = new Ripple();
  ripples.push(newRipple);
  console.log(ripples);
}
