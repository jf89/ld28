var SCREEN_WIDTH  = 1024;
var SCREEN_HEIGHT = 768;

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

	sound.load();
}

function create() {
	var intro =
		'Welcome to Gauntlet\n' +
		'\n' +
		'In Gauntlet you will face a swarm\n' +
		'of enemy spaceships. You must out\n' +
		'manouevre them to overcome them.\n' +
		'You must kill them at their source.\n' +
		'They spawn from pads around the station.\n' +
		'\n' +
		'For this task you too shall have a\n' +
		'spaceship.\n' +
		'\n' +
		'Unlike them, though...\n' +
		'... You only get one.\n' +
		'\n' +
		'[press space to continue]';
	input.create();
	sound.create();
	state = new TextScreen(intro);
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
