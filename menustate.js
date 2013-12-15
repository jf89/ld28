function MenuState() {
}

MenuState.prototype.init = function() {
	controls = [
		new TapControl(['fire'], 1000, function() { changeState(new GameState()) })
	];
}

MenuState.prototype.update = function() {
}

MenuState.prototype.destroy = function() {
}
