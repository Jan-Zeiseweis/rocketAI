var ships;
var sun;
var walls;
var numShips;
var gravity;
var step;
var maxSteps;

var gui;

function setup() {
  createCanvas(600, 600);

  // Walls
  walls = new Group();
  createWalls();

  // Sun
  createSun();

  // Ships
  numShips = 1; 
  ships = [];
  createShips();

  // Gravity
  gravity = { force: 0.1, direction: 90 };

  step = 0;
  maxSteps = 400;

  // GUI
  gui = createGui('Settings', 610, 10);
  gui.addGlobals('numShips');

}

function draw() {
  background(0);

  updateShips();
  drawSprites();
  step++;

}

function createWalls() {
  var wallThickness = 100;
  var wallTop = createSprite(width/2, -wallThickness/2, width, wallThickness);
  wallTop.immovable = true;
  walls.add(wallTop);
  var wallRight = createSprite(width + wallThickness/2, width/2, wallThickness, height);
  wallRight.immovable = true;
  wallRight.shapeColor = color(0);
  walls.add(wallRight);
  var wallBottom = createSprite(width/2, height+wallThickness/2, width, wallThickness);
  wallBottom.immovable = true;
  walls.add(wallBottom);
  var wallLeft = createSprite(-wallThickness/2, width/2, wallThickness, height);
  wallLeft.immovable = true;
  walls.add(wallLeft);
}

function createSun() {
  sun = new Sun();
}

function createShips() {
  for (var i = 0; i < numShips; i++) {
    ships.push(new Ship([
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
      {r: 4, l: 4, t: 100},
    ]));
  }
}

function updateShips() {
  ships.forEach(function(ship) {
    ship.update();
  });
}
