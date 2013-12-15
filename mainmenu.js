var MAIN_MENU = [
	{
		text: 'Play',
		action: function() { changeState(new GameState()) }
	},
	{
		text: 'Map Size',
		action: [
			{
				text: 'Small',
				action: function() {
					MAP_WIDTH  = 4;
					MAP_HEIGHT = 4;
					spawnerCoords = [
						{ x: 0, y: 0 }
					];
					playerCoords = { x: 3, y: 3 };
					state.dropLevel();
				}
			},
			{
				text: 'Medium',
				action: function() {
					MAP_WIDTH = 7;
					MAP_HEIGHT = 7;
					spawnerCoords = [
						{ x: 0, y: 0 },
						{ x: 6, y: 6 }
					];
					playerCoords = { x: 3, y: 3 };
					state.dropLevel();
				}
			},
			{
				text: 'Large',
				action: function() {
					MAP_WIDTH = 9;
					MAP_HEIGHT = 9;
					spawnerCoords = [
						{ x: 0, y: 0 },
						{ x: 0, y: 8 },
						{ x: 8, y: 0 },
						{ x: 8, y: 8 }
					];
					playerCoords = { x: 4, y: 4 };
					state.dropLevel();
				}
			}
		]
	},
	{
		text: 'Fullscreen',
		action: function() { changeState(new FullscreenState()) }
	},
	{
		text: 'Controls',
		action: function() {
			var controlText =
				'Cursor keys:\n' +
				'Forward: accelerate\n' +
				'Left/Right: rotate counter/clockwise\n' +
				'\n' +
				'Spacebar: fire\n' +
				'A/D: strafe left/right\n' +
				'S: brake\n' +
				'\n' +
				'\n' +
				'Press spacebar to return to the main menu';
			changeState(new TextScreen(controlText));
		}
	}
];

