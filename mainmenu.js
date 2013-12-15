var MAIN_MENU = [
	{
		text: 'Play',
		action: function() { changeState(new GameState()) }
	},
	{
		text: 'Map Size',
		action: [
			{
				text: 'Large',
				action: function() {
					MAP_WIDTH = 7;
					MAP_HEIGHT = 7;
					state.dropLevel();
				}
			},
			{
				text: 'Small',
				action: function() {
					MAP_WIDTH = 3;
					MAP_HEIGHT = 3;
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

