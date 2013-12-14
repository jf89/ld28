function Shunt(shuntDuration, shuntSpeed) {
	this._angle = 0;
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
		this._shunting = false;
	} else {
		this._angle = Math.PI * angle / 180;
		this._shunting = true;
		this._stopAt = game.time.now + this._shuntDuration;
	}
}

Shunt.prototype.process = function() {
	if (this._shunting) {
		if (game.time.now < this._stopAt) {
			var coeff = this._shuntSpeed * (game.time.now - this._lastUpdate) / 1000;
			var shunt = new Phaser.Point();
			shunt.copyFrom(player.body.velocity);

			shunt.normalize();

			player.x += (
				Math.cos(this._angle) * shunt.x -
				Math.sin(this._angle) * shunt.y
			) * coeff;
			player.y += (
				Math.sin(this._angle) * shunt.x +
				Math.cos(this._angle) * shunt.y
			) * coeff;
		} else {
			this._shunting = false;
		}
	}
	this._lastUpdate = game.time.now;
}
