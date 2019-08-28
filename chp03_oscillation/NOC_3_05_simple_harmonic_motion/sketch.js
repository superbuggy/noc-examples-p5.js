// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function setup() {
  createCanvas(640, 360);
  colorMode(HSL)
  fill(23, 50, 100);
}

function draw() {
  background(51);
  let y = amplitude * sin(TWO_PI * frameCount / period) + amplitude;
  let x = frameCount % width;
  const hue = map(x, 0, width, 0, 360);
  let period = 120;
  let amplitude = height / 2;

  // stroke(255);
  strokeWeight(2);
  point(x, y)
}