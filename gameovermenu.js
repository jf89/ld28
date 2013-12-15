var GAME_OVER_MENU = [
	{
		text: 'Play Again',
		action: function() { changeState(new GameState()) }
	},
	{
		text: 'Main Menu',
		action: function() { changeState(new MenuState('Gauntlet', MAIN_MENU)) }
	}
];
