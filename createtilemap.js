function createTileMap(width, height) {
	var data = new Array(width * 16 * height * 16);
	var maze = generateMaze(width, height);

	for (var i = 0; i < width; ++i)
		for (var j = 0; j < height; ++j) {
			var mazePiece;
			var rotFun;
			switch (maze[i][j]) {
				case NORTH:
					rotFun = identity;
					mazePiece = MAZE_PIECES.deadend[0];
					break;
				case EAST:
					rotFun = rotateClockwise;
					mazePiece = MAZE_PIECES.deadend[0];
					break;
				case SOUTH:
					rotFun = fullRotate;
					mazePiece = MAZE_PIECES.deadend[0];
					break;
				case WEST:
					rotFun = rotateCounterClockwise;
					mazePiece = MAZE_PIECES.deadend[0];
					break;
				case NORTH | SOUTH:
					rotFun = identity;
					mazePiece = MAZE_PIECES.straight[0];
					break;
				case EAST | WEST:
					rotFun = rotateClockwise;
					mazePiece = MAZE_PIECES.straight[0];
					break
				case NORTH | EAST:
					rotFun = identity;
					mazePiece = MAZE_PIECES.corner[0];
					break;
				case EAST | SOUTH:
					rotFun = rotateClockwise;
					mazePiece = MAZE_PIECES.corner[0];
					break;
				case SOUTH | WEST:
					rotFun = fullRotate;
					mazePiece = MAZE_PIECES.corner[0];
					break;
				case WEST | NORTH:
					rotFun = rotateCounterClockwise;
					mazePiece = MAZE_PIECES.corner[0];
					break;
				case WEST | NORTH | EAST:
					rotFun = identity;
					mazePiece = MAZE_PIECES.junction[0];
					break;
				case NORTH | EAST | SOUTH:
					rotFun = rotateClockwise;
					mazePiece = MAZE_PIECES.junction[0];
					break;
				case EAST | SOUTH | WEST:
					rotFun = fullRotate;
					mazePiece = MAZE_PIECES.junction[0];
					break;
				case SOUTH | WEST | NORTH:
					rotFun = rotateCounterClockwise;
					mazePiece = MAZE_PIECES.junction[0];
					break;
				case NORTH | SOUTH | EAST | WEST:
					rotFun = identity;
					mazePiece = MAZE_PIECES.crossroad[0];
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
