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
	new TapControl(keymap, ['shuntLeft'],  1000, shuntLeft),
	new TapControl(keymap, ['shuntRight'], 1000, shuntRight)
];
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
	player.body.drag.x = 50;
	player.body.drag.y = 50;

	game.camera.follow(player);

	for (var key in keymap)
		keymap[key] = game.input.keyboard.addKey(keymap[key]);
}

function update() {
	for (var i = 0; i < controls.length; ++i)
		controls[i].pollInput(game.time.now);

	var acceleration;
	if (keymap.forward.isDown)
		acceleration = 200;
	else if (keymap.brake.isDown)
		acceleration = -200;
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
}

function shunt(angle) {
	var shunt = new Phaser.Point();
	shunt.copyFrom(game.physics.velocityFromAngle(player.angle + angle, 500));
	player.body.velocity.add(shunt.x, shunt.y);
}

function shuntLeft() {
	shunt(-90);
}

function shuntRight() {
	shunt(90);
}
