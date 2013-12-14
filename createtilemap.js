function createTileMap(width, height) {
	var data = new Array(width * 16 * height * 16);
	var maze = generateMaze(width, height);

	for (var i = 0; i < width; ++i)
		for (var j = 0; j < height; ++j) {
			var mazePiece;
			switch (maze[i][j]) {
				case NORTH:
				case EAST:
				case SOUTH:
				case WEST:
					mazePiece = MAZE_PIECES.deadend[0];
					break;
				case NORTH | SOUTH:
				case EAST | WEST:
					mazePiece = MAZE_PIECES.straight[0];
					break
				case NORTH | EAST:
				case EAST | SOUTH:
				case SOUTH | WEST:
				case WEST | NORTH:
					mazePiece = MAZE_PIECES.corner[0];
					break;
				case WEST | NORTH | EAST:
				case NORTH | EAST | SOUTH:
				case EAST | SOUTH | WEST:
				case SOUTH | WEST | NORTH:
					mazePiece = MAZE_PIECES.junction[0];
					break;
				case NORTH | SOUTH | EAST | WEST:
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
					data[datapos] = mazePiece[l * 16 + k];
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
