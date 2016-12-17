function PathFinder() {
	this.grid = new Grid();


	this.findPath = function(startX, startY, endX, endY) {
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
					neighbor.h = neighbor.h || heuristic(abs(x - endX), abs(y - endY));
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
  this.drawPath = function(path) {
    for ( var i = 0; i < path.length; i++) {
      if (i % 5 === 0) {
        var sp = createSprite(path[i][0], path[i][1], 1, 1);
        sp.shapeColor = color(255);

      }
    }
  }
}


function heuristic(dx, dy) {
  var F = Math.SQRT2 - 1;
  return (dx < dy) ? F * dx + dy : F * dy + dx;

}

