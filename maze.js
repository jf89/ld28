var NORTH = 1;
var EAST  = 2;
var SOUTH = 4;
var WEST  = 8;

function generateMaze(width, height) {
	var maze = new Array(width + 2);
	for (var i = 0; i < width + 2; ++i) {
		maze[i] = new Array(height + 2);
		for (var j = 0; j < height + 2; ++j)
			maze[i][j] = i == 0 || j == 0 || i == width + 1 || j == height + 1 ? 16 : 0;
	}
	console.log(maze);
	function visit(x, y) {
		while (true) {
			var unvisitedNeighbours = [];
			if (!maze[x][y + 1]) unvisitedNeighbours.push([SOUTH, x, y + 1]);
			if (!maze[x][y - 1]) unvisitedNeighbours.push([NORTH, x, y - 1]);
			if (!maze[x + 1][y]) unvisitedNeighbours.push([EAST,  x + 1, y]);
			if (!maze[x - 1][y]) unvisitedNeighbours.push([WEST,  x - 1, y]);
			if (unvisitedNeighbours.length == 0) break;
			var i = Math.floor(Math.random() * unvisitedNeighbours.length);
			var d  = unvisitedNeighbours[i][0];
			var nx = unvisitedNeighbours[i][1];
			var ny = unvisitedNeighbours[i][2];
			switch (d) {
				case NORTH:
					maze[x][y]   |= NORTH;
					maze[nx][ny] |= SOUTH;
					break;
				case SOUTH:
					maze[x][y]   |= SOUTH;
					maze[nx][ny] |= NORTH;
					break;
				case EAST:
					maze[x][y]   |= EAST;
					maze[nx][ny] |= WEST;
					break;
				case WEST:
					maze[x][y]   |= WEST;
					maze[nx][ny] |= EAST;
					break;
			}
			visit(nx, ny);
		}
	}
	var x = Math.floor(Math.random() * width) + 1;
	var y = Math.floor(Math.random() * height) + 1;
	visit(x, y);
	return maze;
}
