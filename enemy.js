function Enemy(x, y) {
	this._bullets = game.add.group();
	this._bullets.createMultiple(50, 'enemy-bullet');
	this._bullets.setAll('anchor.x', 0.8);
	this._bullets.setAll('anchor.y', 0.5);
	this._bullets.setAll('outOfBoundsKill', true);
	this._sprite = game.add.sprite(x, y, 'enemy');
	this._sprite.anchor.setTo(0.5, 0.5);
}

Enemy.prototype.update = function() {
	var x = Math.floor(this._sprite.x / 512);
	var y = Math.floor(this._sprite.y / 512);
	var px = Math.floor(player.x / 512);
	var py = Math.floor(player.y / 512);
	var goal = pathFinder.nextStep(x, y, px, py);
}
