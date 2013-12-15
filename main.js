var SCREEN_WIDTH  = 800;
var SCREEN_HEIGHT = 600;

var MAP_WIDTH = 7;
var MAP_HEIGHT = 7;

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map;
var tileset;
var layer;

var keymap = {
	forward:    Phaser.Keyboard.UP,
	left:       Phaser.Keyboard.LEFT,
	right:      Phaser.Keyboard.RIGHT,
	brake:      Phaser.Keyboard.SPACEBAR,
	shuntLeft:  Phaser.Keyboard.Z,
	shuntRight: Phaser.Keyboard.C,
	fire:       Phaser.Keyboard.X
};
var controls = [
	new TapControl(['shuntLeft'],  1000, function() { shunt.left(); }),
	new TapControl(['shuntRight'], 1000, function() { shunt.right(); }),
	new TapControl(['fire'],       100,  fireBullet)
];
var shunt = new Shunt(500, 250);
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

	for (var key in keymap)
		keymap[key] = game.input.keyboard.addKey(keymap[key]);

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

	player = game.add.sprite(MAP_WIDTH * 256, MAP_HEIGHT * 256, 'player');
	player.anchor.setTo(0.5, 0.5);
	player.body.drag.x = 0;
	player.body.drag.y = 0;
	player.body.maxVelocity.x = 350;
	player.body.maxVelocity.y = 350;
	player.body.immovable = true;
	player.body.setSize(8, 8, -12, -12);
	game.camera.follow(player);
}

function update() {
	game.physics.collide(enemyBullets, player, enemyBulletHitPlayer);
	enemyContainer.update();

	for (var i = 0; i < controls.length; ++i)
		controls[i].pollInput();

	shunt.process();

	var acceleration;
	if (keymap.forward.isDown)
		acceleration = 300;
	else
		acceleration = 0;
	player.body.acceleration.copyFrom(
		game.physics.velocityFromAngle(player.angle, acceleration)
	);

	var angularVelocity;
	if (keymap.left.isDown)
		angularVelocity = -250;
	else if (keymap.right.isDown)
		angularVelocity = 250;
	else
		angularVelocity = 0;
	player.body.angularVelocity = angularVelocity;

	if (keymap.brake.isDown) {
		player.body.drag.x = 250;
		player.body.drag.y = 250;
	} else {
		player.body.drag.x = 0;
		player.body.drag.y = 0;
	}

	var x = layer.getTileX(player.x);
	var y = layer.getTileY(player.y);
	if (map.getTile(x, y) == 1)
		gameOver();
	//map.putTile(1, x, y);
}

function fireBullet() {
	if (player.alive) {
		var bullet = playerBullets.getFirstExists(false);
		if (bullet === null)
			return;
		bullet.reset(player.x, player.y);
		bullet.rotation = player.rotation;
		bullet.body.velocity.copyFrom(game.physics.velocityFromAngle(bullet.angle, 500));
	}
}

function gameOver() {
	if (player.alive) {
		player.kill();
		playerEmitter.x = player.x;
		playerEmitter.y = player.y;
		playerEmitter.start(true, 2000, null, 10);
	}
}

function enemyBulletHitPlayer(player, bullet) {
	bullet.kill();
	gameOver();
}

function playerBulletHitEnemy(enemy, bullet) {
	bullet.kill();
	if (enemy.alive) {
		var enemy = enemyContainer.enemyById(enemy.__id);
		enemy.hit();
	}
}
