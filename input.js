var keymap = {
	forward:    Phaser.Keyboard.UP,
	left:       Phaser.Keyboard.LEFT,
	right:      Phaser.Keyboard.RIGHT,
	downarrow:  Phaser.Keyboard.DOWN,
	brake:      Phaser.Keyboard.S,
	shuntLeft:  Phaser.Keyboard.A,
	shuntRight: Phaser.Keyboard.D,
	fire:       Phaser.Keyboard.SPACEBAR
};
var controls;

var input = {
	create: function() {
			for (var key in keymap)
				keymap[key] = game.input.keyboard.addKey(keymap[key]);
		},

	update: function() {
			for (var i = 0; i < controls.length; ++i)
				controls[i].pollInput();
		}
}
