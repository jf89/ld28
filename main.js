var SCREEN_WIDTH  = 800;
var SCREEN_HEIGHT = 600;

var MAP_WIDTH = 7;
var MAP_HEIGHT = 7;

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map;
var tileset;
var layer;

var pathFinder;
var player;
var playerBullets;
var enemyBullets;

var playerEmitter;
var enemyEmitter;

var enemyContainer;

var state;

function preload() {
	game.load.tilemap('tilemap', null, createTileMap(MAP_WIDTH, MAP_HEIGHT), Phaser.Tilemap.TILED_JSON);
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
	state = new GameState();
	state.init();
}

function update() {
	state.update();
}

function enemyBulletHitPlayer(_player, bullet) {
	bullet.kill();
	player.hit();
}

function playerBulletHitEnemy(enemy, bullet) {
	bullet.kill();
	if (enemy.alive) {
		var enemy = enemyContainer.enemyById(enemy.__id);
		enemy.hit();
	}
}
