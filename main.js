var SCREEN_WIDTH  = 1024;
var SCREEN_HEIGHT = 768;
var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map;
var tileset;
var layer;

var keymap = {
	forward:    Phaser.Keyboard.W,
	left:       Phaser.Keyboard.A,
	right:      Phaser.Keyboard.D,
	brake:      Phaser.Keyboard.S,
	shuntLeft:  Phaser.Keyboard.Q,
	shuntRight: Phaser.Keyboard.E,
	fire:       Phaser.Keyboard.SPACEBAR
};
var controls = [
	new TapControl(['shuntLeft'],  1000, function() { shunt.left(); }),
	new TapControl(['shuntRight'], 1000, function() { shunt.right(); }),
	new TapControl(['fire'],       100,  fireBullet)
];
var shunt = new Shunt(500, 250);
var player;
var playerBullets;

function preload() {
	//game.load.tilemap('tilemap', 'tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('tilemap', null, createTileMap(4, 4), Phaser.Tilemap.TILED_JSON);
	game.load.tileset('tileset', 'tileset.png', 32, 32, -1, 0, 0);
	game.load.image('player', 'player.png');
	game.load.image('player-bullet', 'player-bullet.png');
}

function create() {
	map = game.add.tilemap('tilemap');
	tileset = game.add.tileset('tileset');
	layer = game.add.tilemapLayer(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, tileset, map, 0);
	layer.resizeWorld();

	for (var key in keymap)
		keymap[key] = game.input.keyboard.addKey(keymap[key]);

	playerBullets = game.add.group();
	playerBullets.createMultiple(300, 'player-bullet');
	playerBullets.setAll('anchor.x', 0.8);
	playerBullets.setAll('anchor.y', 0.5);
	playerBullets.setAll('outOfBoundsKill', true);

	player = game.add.sprite(512, 512, 'player');
	player.anchor.setTo(0.5, 0.5);
	player.body.drag.x = 0;
	player.body.drag.y = 0;
	player.body.maxVelocity.x = 350;
	player.body.maxVelocity.y = 350;

	game.camera.follow(player);
}

function update() {
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
		angularVelocity = -200;
	else if (keymap.right.isDown)
		angularVelocity = 200;
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

	//var x = layer.getTileX(player.x);
	//var y = layer.getTileY(player.y);
	//map.putTile(1, x, y);
}

function fireBullet() {
	var bullet = playerBullets.getFirstExists(false);
	if (bullet === null)
		return;
	bullet.reset(player.x, player.y);
	bullet.rotation = player.rotation;
	bullet.body.velocity.copyFrom(game.physics.velocityFromAngle(bullet.angle, 400));
}
