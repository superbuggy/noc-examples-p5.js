let startAngle = 0
let angleVel = Math.PI / 180 / 2

function setup() {
  createCanvas(640, 360)
  colorMode(HSL)
}

function draw() {
  background(51)

  startAngle += 0.015
  let angle = startAngle

  for (let x = 0; x <= width; x += 1) {
    let y = map(sin(angle), -1, 1, height / 6, height * 5 / 6)
    const hue = ((y % 360) + x ) % 360
    stroke(hue, 100, 50)
    strokeWeight(2)
    line(x, y, x, y + 100)
    angle += angleVel
  }
}