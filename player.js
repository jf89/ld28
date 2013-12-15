function Player(x, y) {
	this._bullets = game.add.group();
	this._bullets.createMultiple(300, 'player-bullet');
}
