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
var hud;

var MAP_WIDTH  = 7;
var MAP_HEIGHT = 7;
var spawnerCoords = [
	{ x: 0, y: 0 },
	{ x: 6, y: 6 }
];
var playerCoords = { x: 3, y: 3 };

function GameState() {
	this._victory = false;
}

GameState.prototype.init = function() {
	game.load.tilemap('tilemap', null, createTileMap(MAP_WIDTH, MAP_HEIGHT), Phaser.Tilemap.TILED_JSON);

	controls = [
		new TapControl(['shuntLeft'],  PLAYER_SHUNT_COOLDOWN, function() { player.shunt.left() }),
		new TapControl(['shuntRight'], PLAYER_SHUNT_COOLDOWN, function() { player.shunt.right() }),
		new TapControl(['fire'],       PLAYER_FIRE_COOLDOWN,  function() { player.fireBullet() })
	];

	map = game.add.tilemap('tilemap');
	tileset = game.add.tileset('tileset');
	layer = game.add.tilemapLayer(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, tileset, map, 0);
	layer.resizeWorld();

	enemyContainer = new EnemyContainer();
	for (var i = 0; i < spawnerCoords.length; ++i)
		enemyContainer.addEnemySpawner(
			spawnerCoords[i].x * 512 + 256,
			spawnerCoords[i].y * 512 + 256
		);

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

	player = new Player(playerCoords.x * 512 + 256, playerCoords.y * 512 + 256);
	hud = new HUD();
}

GameState.prototype.update = function() {
	if (!this._victory) {
		player.update();
		enemyContainer.update();
		hud.update();
		if (enemyContainer._enemies.length == 0 && !player._isDead) {
			game.camera.target = null;
			this._victory = true;
			this._victoryTimeout = game.time.now + 1500;
		}
	} else {
		if (game.time.now > this._victoryTimeout)
			changeState(new MenuState('VICTORY!', GAME_OVER_MENU, backgroundCleanup));
	}
}

GameState.prototype.destroy = function() {
	enemyContainer.removeAll();
}

function backgroundCleanup() {
	hud.destroy();
	map.destroy();
	layer.destroy();
	playerBullets.destroy();
	enemyBullets.destroy();
	playerEmitter.destroy();
	enemyEmitter.destroy();
	player.destroy();
}
