function createTileMap(width, height) {
	data = new Array(width * height);
	for (var i = 0; i < data.length; ++i)
		data[i] = 2;
	var tileMap = {
		layers: [
			{
				name:    'background',
				width:   width,
				height:  height,
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
