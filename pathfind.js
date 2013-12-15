function PathFinder(maze) {
	this._maze = maze;
	this._width = maze.length;
	this._height = maze[0].length;
	this._distGraph = this._calculateDistGraph(maze);
}

PathFinder.prototype._calculateDistGraph = function(maze) {
	var size = this._width * this._height;
	var distGraph = new Array(size);
	for (var i = 0; i < this._width; ++i)
		for (var j = 0; j < this._height; ++j) {
			var id = this._nodeId(i, j);
			distGraph[id] = new Array(size);
			for (var k = 0; k < size; ++k)
				distGraph[id][k] = size + 1;
			if (maze[i][j] & NORTH)
				distGraph[id][this._nodeId(i, j - 1)] = 1;
			if (maze[i][j] & SOUTH)
				distGraph[id][this._nodeId(i, j + 1)] = 1;
			if (maze[i][j] & EAST)
				distGraph[id][this._nodeId(i + 1, j)] = 1;
			if (maze[i][j] & WEST)
				distGraph[id][this._nodeId(i - 1, j)] = 1;
			distGraph[id][id] = 0;
		}
	for (var k = 0; k < size; ++k)
		for (var i = 0; i < size; ++i)
			for (var j = 0; j < size; ++j)
				if (distGraph[i][j] > distGraph[i][k] + distGraph[k][j])
					distGraph[i][j] = distGraph[i][k] + distGraph[k][j];
	return distGraph;
}

PathFinder.prototype.nextStep = function(sx, sy, ex, ey) {
	var sid = this._nodeId(sx, sy);
	var eid = this._nodeId(ex, ey);
	if (this._distGraph[sid] === undefined) {
		console.log('DEBUG: this._distGraph[sid] === undefined');
		console.log(sid, eid, sx, sy, ex, ey);
	}
	var dist = this._distGraph[sid][eid];
	if (this._maze[sx][sy] & NORTH && this._distGraph[this._nodeId(sx, sy - 1)][eid] == dist - 1)
		return { x: sx, y: sy - 1 };
	if (this._maze[sx][sy] & WEST && this._distGraph[this._nodeId(sx - 1, sy)][eid] == dist - 1)
		return { x: sx - 1, y: sy };
	if (this._maze[sx][sy] & SOUTH && this._distGraph[this._nodeId(sx, sy + 1)][eid] == dist - 1)
		return { x: sx, y: sy + 1 };
	return { x: sx + 1, y: sy };
}

PathFinder.prototype._nodeId = function(x, y) {
	return y * this._width + x;
}
