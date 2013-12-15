function Enemy(x, y) {
	this._bullets = game.add.group();
	this._bullets.createMultiple(50, 'enemy-bullet');
	this._bullets.setAll('anchor.x', 0.8);
	this._bullets.setAll('anchor.y', 0.5);
	this._bullets.setAll('outOfBoundsKill', true);
	this._sprite = game.add.sprite(x, y, 'enemy');
	this._sprite.anchor.setTo(0.5, 0.5);
	this._sprite.body.maxVelocity.x = 250;
	this._sprite.body.maxVelocity.y = 250;
}

Enemy.prototype.update = function() {
	var x = Math.floor(this._sprite.x / 512);
	var y = Math.floor(this._sprite.y / 512);
	var px = Math.floor(player.x / 512);
	var py = Math.floor(player.y / 512);
	var gx, gy;
	if (x != px || y != py) {
		var goal = pathFinder.nextStep(x, y, px, py);
		gx = goal.x * 512 + 256;
		gy = goal.y * 512 + 256;
	} else {
		gx = player.x;
		gy = player.y;
	}
	this._sprite.body.acceleration.x = gx - this._sprite.x;
	this._sprite.body.acceleration.y = gy - this._sprite.y;
	this._sprite.body.acceleration.normalize();
	this._sprite.body.acceleration.x *= 250;
	this._sprite.body.acceleration.y *= 250;
	var goal = new Phaser.Point(gx, gy);
	this._sprite.rotation = game.physics.angleBetween(this._sprite, goal);
}
