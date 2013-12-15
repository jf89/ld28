function TextScreen(text) {
	this._text = game.add.text(
		game.camera.x + SCREEN_WIDTH / 2,
		game.camera.y + SCREEN_HEIGHT / 2,
		text,
		{ font: '40px Arial', fill: '#09c', align: 'center' }
	);
	this._text.anchor.setTo(0.5, 0.5);
}

TextScreen.prototype.init = function() {
	controls = [
		new TapControl(['fire'], 0, function() { changeState(new MenuState('Gauntlet', MAIN_MENU)) })
	];
}

TextScreen.prototype.destroy = function() {
	this._text.destroy();
}

TextScreen.prototype.update = function() {
}
