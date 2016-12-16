function PathFinder() {
	this.grid = new Grid();

	this.findPath = function(startX, startY, endX, endY) {
    console.log(startX, startY, endX, endY);
		var openList = new BinaryHeap(function(node) {
			return node.f;
    }),
      startNode = this.grid.getNodeAt(startX, startY),
			endNode = this.grid.getNodeAt(endX, endY),
			node, neighbors, neighbor, i, l, x, y, ng;
    var grid = this.grid;
		// set the `g` and `f` value of the start node to be 0
		startNode.g = 0;
		startNode.f = 0;

		// push the start node into the open list
		openList.push(startNode);
		startNode.opened = true;

		// while the open list is not empty
		while (!openList.empty()) {
			// pop the position of node which has the minimum `f` value.
			node = openList.pop();
			node.closed = true;

			// if reached the end position, construct the path and return it
			if (node === endNode) {
				return backtrace(endNode);
			}

			// get neigbours of the current node
			neighbors = grid.getNeighbors(node);
			for (i = 0, l = neighbors.length; i < l; ++i) {
				neighbor = neighbors[i];

				if (neighbor.closed) {
					continue;
				}

				x = neighbor.x;
				y = neighbor.y;

				// get the distance between current node and the neighbor
				// and calculate the next g score
				ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : Math.SQRT2);

				// check if the neighbor has not been inspected yet, or
				// can be reached with smaller cost from the current node
				if (!neighbor.opened || ng < neighbor.g) {
					neighbor.g = ng;
					neighbor.h = neighbor.h || dist(x, y, endX, endY); //weight * heuristic(abs(x - endX), abs(y - endY));
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.parent = node;

					if (!neighbor.opened) {
						openList.push(neighbor);
						neighbor.opened = true;
					} else {
						// the neighbor can be reached with smaller cost.
						// Since its f value has been updated, we have to
						// update its position in the open list
            openList.remove(neighbor);
            openList.push(neighbor);
						//openList.updateItem(neighbor);
					}
				}
			} // end for each neighbor
		} // end while not open list empty

		// fail to find the path
		return [];
	}
}

function Grid() {
	this.buildNodes = function() {
		var nodes = [];
    for (i = 0; i < width; ++i) {
      nodes[i] = new Array(height);
      for (j = 0; j < height; ++j) {
        nodes[i][j] = new Node(i, j);
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
			neighbors.push(nodes[y - 1][x]);
			s0 = true;
		}
		// →
		if (this.isWalkableAt(x + 1, y)) {
			neighbors.push(nodes[y][x + 1]);
			s1 = true;
		}
		// ↓
		if (this.isWalkableAt(x, y + 1)) {
			neighbors.push(nodes[y + 1][x]);
			s2 = true;
		}
		// ←
		if (this.isWalkableAt(x - 1, y)) {
			neighbors.push(nodes[y][x - 1]);
			s3 = true;
		}
		d0 = s3 && s0;
		d1 = s0 && s1;
		d2 = s1 && s2;
		d3 = s2 && s3;

		// ↖
		if (d0 && this.isWalkableAt(x - 1, y - 1)) {
			neighbors.push(nodes[y - 1][x - 1]);
		}
		// ↗
		if (d1 && this.isWalkableAt(x + 1, y - 1)) {
			neighbors.push(nodes[y - 1][x + 1]);
		}
		// ↘
		if (d2 && this.isWalkableAt(x + 1, y + 1)) {
			neighbors.push(nodes[y + 1][x + 1]);
		}
		// ↙
		if (d3 && this.isWalkableAt(x - 1, y + 1)) {
			neighbors.push(nodes[y + 1][x - 1]);
		}

		return neighbors;
	};

	this.isWalkableAt = function(x ,y) {
		return this.isInside(x, y) && this.nodes[y][x].walkable;
	};

	this.isInside = function(x, y) {
		return (x >= 0 && x < width) && (y >= 0 && y < height);
	};

	this.setWalkableAt = function(x,y) {
		this.nodes[y][x].walkable = walkable;
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
