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
	}
];
