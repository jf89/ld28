function Shunt(shuntDuration, shuntSpeed) {
	this._shunt = new Phaser.Point();
	this._shunting = false;
	this._shuntDuration = shuntDuration;
	this._shuntSpeed = shuntSpeed;
	this._stopAt;
	this._lastUpdate = 0;
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
		sound.shunt.play();
		this._shunt.copyFrom(
			game.physics.velocityFromAngle(player._sprite.angle + angle, this._shuntSpeed)
		);
		this._shunting = true;
		this._stopAt = game.time.now + this._shuntDuration;
	}
}

Shunt.prototype.update = function() {
	if (this._shunting) {
		if (game.time.now < this._stopAt) {
			var coeff = (game.time.now - this._lastUpdate) / 1000;
			player._sprite.x += this._shunt.x * coeff;
			player._sprite.y += this._shunt.y * coeff;
		} else {
			this._shunting = false;
		}
	}
	this._lastUpdate = game.time.now;
}
