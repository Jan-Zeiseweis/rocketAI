function Grid() {
  this.walker = createSprite(0,0,0,0);
  this.buildNodes = function() {
    var nodes = [];
    for (i = 0; i < width; ++i) {
      nodes[i] = new Array(height);
      for (j = 0; j < height; ++j) {
        var node = new Node(i, j);
        this.walker.position.x = node.x;
        this.walker.position.y = node.y;
        node.walkable = true;
        for (var k = 0; k < obstacles.length; k++) {
          var obstacle = obstacles[k];
          if (node.x >= obstacle.position.x - obstacle.width / 2 &&
            node.x <= obstacle.position.x + obstacle.width / 2 &&
              node.y >= obstacle.position.y - obstacle.height / 2 &&
              node.y <= obstacle.position.y + obstacle.height / 2) {
                node.walkable = false;
                break;
              }
        }
        //node.walkable = !this.walker.collide(obstacles);//, function(o, n) {console.log(o.position.x)});
        nodes[i][j] = node;
      }
    }
    return nodes;
  };

  this.nodes = this.buildNodes();

  this.getNodeAt = function(x, y) {
    return this.nodes[x][y];
  };

  this.getNeighbors = function(node) {
    var x = node.x,
      y = node.y,
      neighbors = [],
      s0 = false, d0 = false,
      s1 = false, d1 = false,
      s2 = false, d2 = false,
      s3 = false, d3 = false,
      nodes = this.nodes;

    // ↑
    if (this.isWalkableAt(x, y - 1)) {
      neighbors.push(nodes[x][y - 1]);
      s0 = true;
    }
    // →
    if (this.isWalkableAt(x + 1, y)) {
      neighbors.push(nodes[x + 1][y]);
      s1 = true;
    }
    // ↓
    if (this.isWalkableAt(x, y + 1)) {
      neighbors.push(nodes[x][y + 1]);
      s2 = true;
    }
    // ←
    if (this.isWalkableAt(x - 1, y)) {
      neighbors.push(nodes[x - 1][y]);
      s3 = true;
    }
    d0 = s3 && s0;
    d1 = s0 && s1;
    d2 = s1 && s2;
    d3 = s2 && s3;

    // ↖
    if (d0 && this.isWalkableAt(x - 1, y - 1)) {
      neighbors.push(nodes[x - 1][y - 1]);
    }
    // ↗
    if (d1 && this.isWalkableAt(x + 1, y - 1)) {
      neighbors.push(nodes[x + 1][y - 1]);
    }
    // ↘
    if (d2 && this.isWalkableAt(x + 1, y + 1)) {
      neighbors.push(nodes[x + 1][y + 1]);
    }
    // ↙
    if (d3 && this.isWalkableAt(x - 1, y + 1)) {
      neighbors.push(nodes[x - 1][y + 1]);
    }

    return neighbors;
  };

  this.isWalkableAt = function(x ,y) {
    return this.isInside(x, y) && this.nodes[x][y].walkable;
  };

  this.isInside = function(x, y) {
    return (x >= 0 && x < width) && (y >= 0 && y < height);
  };

  this.setWalkableAt = function(x,y) {
    this.nodes[x][y].walkable = walkable;
  };
}

function Node(x, y, walkable) {
  this.x = x;
  this.y = y;
  this.walkable = (walkable === undefined ? true : walkable);
}

function backtrace(node) {
  var path = [[node.x, node.y]];
  while (node.parent) {
    node = node.parent;
    path.push([node.x, node.y]);
  }
  return path.reverse();
}

