var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map;
var tileset;
var layer;

var keymap = {
	forward:    Phaser.Keyboard.W,
	left:       Phaser.Keyboard.Q,
	right:      Phaser.Keyboard.E,
	brake:      Phaser.Keyboard.S,
	shuntLeft:  Phaser.Keyboard.A,
	shuntRight: Phaser.Keyboard.D
};
var controls = [
	new TapControl(['shuntLeft'],  1000, function() { shunt.left(); }),
	new TapControl(['shuntRight'], 1000, function() { shunt.right(); })
];
var shunt = new Shunt(500, 5);
var player;

function preload() {
	game.load.tilemap('tilemap', 'tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tileset('tileset', 'background.png', 32, 32, -1, 0, 0);
	game.load.image('player', 'player.png');
}

function create() {
	map = game.add.tilemap('tilemap');
	tileset = game.add.tileset('tileset');
	layer = game.add.tilemapLayer(0, 0, 800, 600, tileset, map, 0);
	layer.resizeWorld();

	player = game.add.sprite(512, 512, 'player');
	player.anchor.setTo(0.5, 0.5);
	player.body.drag.x = 0;
	player.body.drag.y = 0;

	game.camera.follow(player);

	for (var key in keymap)
		keymap[key] = game.input.keyboard.addKey(keymap[key]);
}

function update() {
	for (var i = 0; i < controls.length; ++i)
		controls[i].pollInput();

	shunt.process();

	var acceleration;
	if (keymap.forward.isDown)
		acceleration = 400;
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
		player.body.drag.x = 50;
		player.body.drag.y = 50;
	} else {
		player.body.drag.x = 0;
		player.body.drag.y = 0;
	}
}
