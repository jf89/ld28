function createTileMap(width, height) {
	var data = new Array(width * 16 * height * 16);
	var maze = generateMaze(width, height);

	pathFinder = new PathFinder(maze);

	for (var i = 0; i < width; ++i)
		for (var j = 0; j < height; ++j) {
			var mazePiece;
			var rotFun;
			switch (maze[i][j]) {
				case NORTH:
					rotFun = identity;
					mazePiece = randomChoice(MAZE_PIECES.deadend);
					break;
				case EAST:
					rotFun = rotateClockwise;
					mazePiece = randomChoice(MAZE_PIECES.deadend);
					break;
				case SOUTH:
					rotFun = fullRotate;
					mazePiece = randomChoice(MAZE_PIECES.deadend);
					break;
				case WEST:
					rotFun = rotateCounterClockwise;
					mazePiece = randomChoice(MAZE_PIECES.deadend);
					break;
				case NORTH | SOUTH:
					rotFun = identity;
					mazePiece = randomChoice(MAZE_PIECES.straight);
					break;
				case EAST | WEST:
					rotFun = rotateClockwise;
					mazePiece = randomChoice(MAZE_PIECES.straight);
					break
				case NORTH | EAST:
					rotFun = identity;
					mazePiece = randomChoice(MAZE_PIECES.corner);
					break;
				case EAST | SOUTH:
					rotFun = rotateClockwise;
					mazePiece = randomChoice(MAZE_PIECES.corner);
					break;
				case SOUTH | WEST:
					rotFun = fullRotate;
					mazePiece = randomChoice(MAZE_PIECES.corner);
					break;
				case WEST | NORTH:
					rotFun = rotateCounterClockwise;
					mazePiece = randomChoice(MAZE_PIECES.corner);
					break;
				case WEST | NORTH | EAST:
					rotFun = identity;
					mazePiece = randomChoice(MAZE_PIECES.junction);
					break;
				case NORTH | EAST | SOUTH:
					rotFun = rotateClockwise;
					mazePiece = randomChoice(MAZE_PIECES.junction);
					break;
				case EAST | SOUTH | WEST:
					rotFun = fullRotate;
					mazePiece = randomChoice(MAZE_PIECES.junction);
					break;
				case SOUTH | WEST | NORTH:
					rotFun = rotateCounterClockwise;
					mazePiece = randomChoice(MAZE_PIECES.junction);
					break;
				case NORTH | SOUTH | EAST | WEST:
					rotFun = identity;
					mazePiece = randomChoice(MAZE_PIECES.crossroad);
					break;
			}
			for (var k = 0; k < 16; ++k)
				for (var l = 0; l < 16; ++l) {
					var datapos =
						j * 16 * 16 * width +
						i * 16 +
						l * 16 * width +
						k;
					data[datapos] = rotFun(k, l, mazePiece);
				}
		}

	var dy = 16 * width;
	for (var i = 1; i < width * 16 - 1; ++i)
		for (var j = 1; j < height * 16 - 1; j ++) {
			var datapos = j * dy + i;
			if (data[datapos] == 2) {
				var tl = datapos - dy - 1;
				var tr = datapos - dy + 1;
				var bl = datapos + dy - 1;
				var br = datapos + dy + 1;
				var t  = datapos - dy;
				var b  = datapos + dy;
				var l  = datapos - 1;
				var r  = datapos + 1;
				if (data[t] == 1 && data[r] == 1)
					data[datapos] = TILE_NE;
				else if (data[t] == 1 && data[l] == 1)
					data[datapos] = TILE_NW;
				else if (data[b] == 1 && data[r] == 1)
					data[datapos] = TILE_SE;
				else if (data[b] == 1 && data[l] == 1)
					data[datapos] = TILE_SW;
				else if (data[t] == 1)
					data[datapos] = TILE_N;
				else if (data[b] == 1)
					data[datapos] = TILE_S;
				else if (data[l] == 1)
					data[datapos] = TILE_W;
				else if (data[r] == 1)
					data[datapos] = TILE_E;
				else if (data[tl] == 1)
					data[datapos] = TILE_CNW;
				else if (data[tr] == 1)
					data[datapos] = TILE_CNE;
				else if (data[bl] == 1)
					data[datapos] = TILE_CSW;
				else if (data[br] == 1)
					data[datapos] = TILE_CSE;
			}
		}

	var tileMap = {
		layers: [
			{
				name:    'background',
				width:   width * 16,
				height:  height * 16,
				opacity: 1,
				visible: true,
				data:    data
			}
		],
		tilesets: [
			{
				margin: 0,
				spacing: 0
			}
		]
	};
	return tileMap;
}

function identity(x, y, mazePiece) {
	return mazePiece[y * 16 + x];
}

function rotateClockwise(x, y, mazePiece) {
	return identity(y, 15 - x, mazePiece);
}

function rotateCounterClockwise(x, y, mazePiece) {
	return identity(15 - y, x, mazePiece);
}

function fullRotate(x, y, mazePiece) {
	return identity(15 - x, 15 - y, mazePiece);
}

function randomChoice(xs) {
	return xs[Math.floor(Math.random() * xs.length)];
}
