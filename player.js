function Player() {
	this.shunt = new Shunt(500, 250);

	this._sprite = game.add.sprite(MAP_WIDTH * 256, MAP_HEIGHT * 256, 'player');
	this._sprite.anchor.setTo(0.5, 0.5);
	this._sprite.body.drag.x = 0;
	this._sprite.body.drag.y = 0;
	this._sprite.body.maxVelocity.x = 350;
	this._sprite.body.maxVelocity.y = 350;
	this._sprite.body.immovable = true;
	this._sprite.body.setSize(8, 8, -12, -12);
	game.camera.follow(this._sprite);

	this._isDead = false;
	this._gameOverDelay = 0;
}

Player.prototype.update = function() {
	if (this._isDead) {
		if (game.time.now > this._gameOverDelay)
			changeState(new MenuState('Game Over', GAME_OVER_MENU, backgroundCleanup));
		return;
	}

	game.physics.collide(enemyBullets, this._sprite, enemyBulletHitPlayer);

	this.shunt.update();

	var acceleration;
	if (keymap.forward.isDown)
		acceleration = 300;
	else
		acceleration = 0;
	this._sprite.body.acceleration.copyFrom(
		game.physics.velocityFromAngle(this._sprite.angle, acceleration)
	);

	var angularVelocity;
	if (keymap.left.isDown)
		angularVelocity = -250;
	else if (keymap.right.isDown)
		angularVelocity = 250;
	else
		angularVelocity = 0;
	this._sprite.body.angularVelocity = angularVelocity;

	if (keymap.brake.isDown) {
		this._sprite.body.drag.x = 250;
		this._sprite.body.drag.y = 250;
	} else {
		this._sprite.body.drag.x = 0;
		this._sprite.body.drag.y = 0;
	}

	var x = layer.getTileX(this._sprite.x);
	var y = layer.getTileY(this._sprite.y);
	if (map.getTile(x, y) == 1)
		this.die();
}

Player.prototype.fireBullet = function() {
	if (!this._isDead) {
		var bullet = playerBullets.getFirstExists(false);
		if (bullet === null)
			return;
		bullet.reset(this._sprite.x, this._sprite.y);
		bullet.rotation = this._sprite.rotation;
		bullet.body.velocity.copyFrom(game.physics.velocityFromAngle(bullet.angle, 500));
	}
}

Player.prototype.hit = function () {
	this.die();
}

Player.prototype.die = function () {
	if (this._sprite.alive) {
		this._sprite.kill();
		this._sprite.destroy();
		playerEmitter.x = this._sprite.x;
		playerEmitter.y = this._sprite.y;
		playerEmitter.start(true, 2000, null, 10);
	}
	if (!this._isDead) {
		this._gameOverDelay = game.time.now + 1000;
		this._isDead = true;
	}
}

function enemyBulletHitPlayer(_player, bullet) {
	bullet.kill();
	player.hit();
}
