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

function GameState() {
}

GameState.prototype.init = function() {
	controls = [
		new TapControl(['shuntLeft'],  1000, function() { player.shunt.left() }),
		new TapControl(['shuntRight'], 1000, function() { player.shunt.right() }),
		new TapControl(['fire'],       100,  function() { player.fireBullet() })
	];

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

GameState.prototype.update = function() {
	player.update();
	enemyContainer.update();
}

GameState.prototype.destroy = function() {
}
