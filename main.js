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
	map = game.add.tilemap('tilemap');
	tileset = game.add.tileset('tileset');
	layer = game.add.tilemapLayer(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, tileset, map, 0);
	layer.resizeWorld();

	enemyContainer = new EnemyContainer();
	enemyContainer.addEnemySpawner(256,                   256);
	enemyContainer.addEnemySpawner(256,                   MAP_HEIGHT * 512 - 256);
	enemyContainer.addEnemySpawner(MAP_WIDTH * 512 - 256, 256);
	enemyContainer.addEnemySpawner(MAP_WIDTH * 512 - 256, MAP_HEIGHT * 512 - 256);

	playerBullets = game.add.group();
	playerBullets.createMultiple(300, 'player-bullet');
	playerBullets.setAll('anchor.x', 0.8);
	playerBullets.setAll('anchor.y', 0.5);
	playerBullets.setAll('outOfBoundsKill', true);

	enemyBullets = game.add.group();
	enemyBullets.createMultiple(1000, 'enemy-bullet');
	enemyBullets.setAll('anchor.x', 0.8);
	enemyBullets.setAll('anchor.y', 0.5);

	playerEmitter = game.add.emitter(0, 0, 500);
	playerEmitter.makeParticles('player-debris');
	playerEmitter.gravity = 0;
	enemyEmitter = game.add.emitter(0, 0, 500);
	enemyEmitter.makeParticles('enemy-debris');
	enemyEmitter.gravity = 0;

	player = new Player();
}

function update() {
	player.update();
	enemyContainer.update();
}

//function gameOver() {
//	if (player.alive) {
//		player.kill();
//		playerEmitter.x = player.x;
//		playerEmitter.y = player.y;
//		playerEmitter.start(true, 2000, null, 10);
//	}
//}

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
