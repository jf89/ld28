function FullscreenState() {
	state.called = false;
	var text =
		'Click the mouse to (attempt) to go full screen.\n' +
		'This can make you lose keyboard controls\n' +
		'in some browsers (e.g. Chrome)\n' +
		'\n' +
		'\n' +
		'If it doesn\'t work correctly, perhaps\n' +
		'try using a different browser';
	this._text = game.add.text(
		game.camera.x + SCREEN_WIDTH / 2,
		game.camera.y + SCREEN_HEIGHT / 2,
		text,
		{ font: '40px Arial', fill: '#09c', align: 'center' }
	);
	this._text.anchor.setTo(0.5, 0.5);
}

FullscreenState.prototype.init = function() {
	//game.input.onDown.addOnce(goFullscreen);
	document.onmousedown = goFullscreen;
}

FullscreenState.prototype.destroy = function() {
	this._text.destroy();
}

FullscreenState.prototype.update = function() {
	if (state.called)
		changeState(new MenuState('Gauntlet', MAIN_MENU));
}

function goFullscreen() {
	game.stage.scale.startFullScreen();
	//game.input.reset(true);
	//input.create();
	state.called = true;
	document.onmousedown = function() {};
}
