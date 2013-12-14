function Shunt(shuntDuration, shuntSpeed) {
	this._shunt = new Phaser.Point();
	this._shunting = false;
	this._shuntDuration = shuntDuration;
	this._shuntSpeed = shuntSpeed;
	this._stopAt;
}

Shunt.prototype.left = function() {
	this._doShunt(-90);
}

Shunt.prototype.right = function() {
	this._doShunt(90);
}

Shunt.prototype._doShunt = function(angle) {
	if (this._shunting) {
		this._shunt.x = 0;
		this._shunt.y = 0;
		this._shunting = false;
	} else {
		this._shunt.copyFrom(
			game.physics.velocityFromAngle(player.angle + angle, this._shuntSpeed)
		);
		this._shunting = true;
		this._stopAt = game.time.now + this._shuntDuration;
	}
}

Shunt.prototype.process = function() {
	if (this._shunting) {
		if (game.time.now < this._stopAt) {
			player.x += this._shunt.x;
			player.y += this._shunt.y;
		} else {
			this._shunting = false;
		}
	}
}
