var ships;
var sun;
var walls;
var obstacles;
var numShips;
var gravity;
var step;
var maxSteps;
var shipStartPostition;
var sunPostition;
var debug = false;
var path;
var pathFinder;

var gui;

function setup() {
  createCanvas(600, 600);

  // Walls
  walls = new Group();
  createWalls();

  // Obstacles
  obstacles = new Group();
  createObstacles();

  // Sun
  sunPostition = createVector(width / 2, 40);
  createSun();
  
  // Ships
  numShips = 1; 
  shipStartPostition = createVector(width / 2, height - 130);
  ships = [];
  createShips();

  // Path Finder
  if (numShips > 0) {
    pathFinder = new PathFinder();
    path = pathFinder.findPath(
      shipStartPostition.x, shipStartPostition.y, sunPostition.x, sunPostition.y);
    for ( var i = 0; i < path.length; i++) {
      if (i % 5 === 0) {
        var sp = createSprite(path[i][0], path[i][1], 1, 1);
        sp.shapeColor = color(255);

      }
    }
  }

  // Gravity
  gravity = { force: 0.0, direction: 90 };

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

function createObstacles() {
  var obstacle = createSprite(width/2, height/2);
  obstacle.shapeColor = color(75);
  obstacles.add(obstacle);
}

function createSun() {
  sun = new Sun();
}

function createShips() {
  for (var i = 0; i < numShips; i++) {
    ships.push(new Ship());
  }
}

function updateShips() {
  ships.forEach(function(ship) {
    ship.update();
  });
}
