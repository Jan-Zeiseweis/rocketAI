function PathFinder() {
  this.gridSize = 100;
  this.walker = createSprite(0, 0, this.gridSize, this.gridSize);
  this.walker.debug = debug;

  this.createCostField = function() {
    this.costField = new Grid();
    for (var i = 0; i < this.costField.cells.length; i++) {
      var cell = this.costField.cells[i];
      this.walker.position.x = cell.position.x;
      this.walker.position.y = cell.position.y;
      cell.cost = 1;
      if (this.walker.collide(obstacles)) {
        cell.cost = 255;
      }
    }
  };

  this.createIntegrationField = function() {
    this.costField.cells.forEach(function(cell) {
      cell.totalCost = 65535;
    });

    var openList = [];
    var startNode = this.costField.cellAtPosition(sun.sprite.position);
    startNode.totalCost = 0;
    openList.push(startNode);
    while (openList.length > 0) {
      var currentCell = openList.shift();
      currentCell.visited = true;
      //console.log(currentCell.totalCost);
      var neighbors = this.costField.neighbors(currentCell);
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (currentCell.totalCost + neighbor.cost < neighbor.totalCost) {
          neighbor.totalCost = currentCell.totalCost + neighbor.cost;
        }
        if (!neighbor.visited) {
          openList.push(neighbor);
        }
      }
    }
  };

  this.drawIntegrationField = function() {
    var maxTotalCost = 0;
    var i;
    var cell;
    for (i = 0; i < this.costField.cells.length; i++) {
      cell = this.costField.cells[i];
      if (cell.totalCost > maxTotalCost) {
        maxTotalCost = cell.totalCost;
      }
    }

    for (i = 0; i < this.costField.cells.length; i++) {
      cell = this.costField.cells[i];
      var sp = createSprite(cell.position.x, cell.position.y, this.gridSize, this.gridSize);
      var spColor = map(cell.totalCost, 0, maxTotalCost, 255, 0);
      console.log(cell.totalCost, spColor);
      sp.shapeColor = color(spColor);
    }
  };
}

function Grid() {
  this.cells = [];
  this.cellSize = 100;
  this.cols = floor(width/this.cellSize);
  this.rows = floor(height/this.cellSize);

  this.gridIndexToPosition = function(col, row) {
    var x = col * this.cellSize + this.cellSize / 2;
    var y = row * this.cellSize + this.cellSize / 2;
    var position = {x: x, y: y};
    return position;
  };

  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.cols; col++) {
      var cell = {};
      cell.position = this.gridIndexToPosition(col, row);
      cell.gridIndex = {col: col,row: row};
      this.cells.push(cell);
    }
  }

  this.cellAtColRow = function(col, row) {
    var gridIndex = col + row * this.cols;
    if (gridIndex < this.cells.length) {
      return this.cells[gridIndex];
    }
  };

  this.gridIndexAtPosition = function(position) {
    var col = floor(position.x / this.cellSize);
    var row = floor(position.y / this.cellSize);
    return {col: col, row: row};
  };

  this.cellAtPosition = function(position) {
    var gridIndex = this.gridIndexAtPosition(position);
    return this.cellAtColRow(gridIndex.col, gridIndex.row);
  };

  this.neighbors = function(cell) {
    var neighbors = [];
    var col = cell.gridIndex.col;
    var row = cell.gridIndex.row;
    var top    = this.cellAtColRow(col    , row - 1);
    var right  = this.cellAtColRow(col + 1, row    );
    var bottom = this.cellAtColRow(col    , row + 1);
    var left   = this.cellAtColRow(col - 1, row    );
    if (top) {
      neighbors.push(top);
    }
    if (right) {
      neighbors.push(right);
    }
    if (bottom) {
      neighbors.push(bottom);
    }
    if (left) {
      neighbors.push(left);
    }
    return neighbors;
  };
}
