var keymap = {
	forward:    Phaser.Keyboard.UP,
	left:       Phaser.Keyboard.LEFT,
	right:      Phaser.Keyboard.RIGHT,
	brake:      Phaser.Keyboard.D,
	shuntLeft:  Phaser.Keyboard.S,
	shuntRight: Phaser.Keyboard.F,
	fire:       Phaser.Keyboard.SPACEBAR
};
var controls;

var input = {
	create: function() {
			console.log('Got here');
			for (var key in keymap)
				keymap[key] = game.input.keyboard.addKey(keymap[key]);
		},

	update: function() {
			for (var i = 0; i < controls.length; ++i)
				controls[i].pollInput();
		}
}
