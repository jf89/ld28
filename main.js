var SCREEN_WIDTH  = 1024;
var SCREEN_HEIGHT = 768;

var MAP_WIDTH = 7;
var MAP_HEIGHT = 7;

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var state;

function preload() {
	game.load.tileset('tileset', 'tileset.png', 32, 32, -1, 0, 0);
	game.load.image('player', 'player.png');
	game.load.image('player-bullet', 'player-bullet.png');
	game.load.image('player-debris', 'player-debris.png');
	game.load.image('enemy', 'enemy.png');
	game.load.image('enemy-bullet', 'enemy-bullet.png');
	game.load.image('enemy-debris', 'enemy-debris.png');
	game.load.image('enemy-spawner', 'spawner.png');
}

function create() {
	input.create();
	state = new MenuState('Gauntlet', MAIN_MENU);
	state.init();
}

function update() {
	input.update();
	state.update();
}

function changeState(newState) {
	state.destroy();
	newState.init();
	state = newState;
}
