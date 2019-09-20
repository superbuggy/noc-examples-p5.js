let vector;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  squigglyLine();
  newTree();
}

function draw() {
  noLoop();
}

function mousePressed() {
  squigglyLine();
  newTree();
  //redraw();
}

function newTree() {
  background(111, 111, 222);
  push();
  // Start the tree from the bottom of the screen
  translate(width / 2, height);
  // Start the recursive branching!
  branch(height / 6);
  pop();
}

function squigglyLine (startX, startY, stopX, stopY) {
  function nextPoint (x, y, theAngle, distance) {
    return [(x + Math.cos(theAngle) * distance), (y - Math.sin(theAngle) * distance)]
  }

  const pointThickness = 4
  // strokeWeight(pointThickness)

  let theAngle = angle(startX, startY, stopX, stopY)

  const numPoints = distance(startX, startY, stopX, stopY) / (0.5 * pointThickness)
  let x = startX
  let y = startY
  for (let i = 1; i <= numPoints; i++) {
    point(x, -y)
    ;[x, y] = nextPoint(x, y, theAngle, pointThickness * 0.5)
    let angleJitter = (Math.random() - .5) * .5
    theAngle += angleJitter
  }
  return [x, y]
}


function angle (startX, startY, stopX, stopY) {
  const inRadians = atan((stopY-startY)/(stopX-startX))
  const theAngle = inRadians * 180/Math.PI
  return inRadians
}

function distance (startX, startY, stopX, stopY) {
  return Math.sqrt( (stopX-startX)**2 + (stopY-startY)**2 )
}

function branch(h, count = 1) {
  // thickness of the branch is mapped to its length
  var lineThickness = map(h, 2, height / 4, 1, 5);
  strokeWeight(lineThickness);
  // Draw the actual branch
  if (h * .75 < 5) {
    stroke(0, 155, 0)
  } else {
    stroke(50 + count * 2, 40, 0)
  }
  let [x,y ] = squigglyLine(0, 0, 0, -h);
  // Move along to end
  translate(x, -y);
  
  h *= .75;

  // All recursive functions must have an exit condition!!!!
  if (h > 5) {
    // A random number of branches
    var n = Math.floor(random(1, 4));
    for (var i = 0; i < n; i++) {
      // Picking a random angle
      var theta = random(-PI/3, PI/3);
      push();      // Save the current state of transformation (i.e. where are we now)
      rotate(theta);     // Rotate by theta
      branch(h, ++count);         // Ok, now call myself to branch again
      pop();       // Whenever we get back here, we "pop" in order to restore the previous matrix state
    }
  }
}
