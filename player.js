function Player(x, y) {
	this.shunt = new Shunt(PLAYER_SHUNT_DURATION, PLAYER_SHUNT_VELOCITY);

	this._sprite = game.add.sprite(x, y, 'player');
	this._sprite.anchor.setTo(0.5, 0.5);
	this._sprite.body.drag.x = 0;
	this._sprite.body.drag.y = 0;
	this._sprite.body.maxVelocity.x = PLAYER_MAX_VELOCITY / Math.sqrt(2);
	this._sprite.body.maxVelocity.y = PLAYER_MAX_VELOCITY / Math.sqrt(2);
	this._sprite.body.immovable = true;
	this._sprite.body.setSize(8, 8, -12, -12);
	game.camera.follow(this._sprite);

	this._isDead = false;
	this._gameOverDelay = 0;

	this.shields = 3;
	this.shieldRespawnDelay;
}

Player.prototype.update = function() {
	if (this._isDead) {
		if (game.time.now > this._gameOverDelay)
			changeState(new MenuState('Game Over', GAME_OVER_MENU, backgroundCleanup));
		return;
	}

	if (this.shields < 3 && game.time.now > this.shieldRespawnDelay) {
		this.shields += 1;
		this.shieldRespawnDelay = game.time.now + PLAYER_SHIELD_RESPAWN_DELAY;
	}

	game.physics.collide(enemyBullets, this._sprite, enemyBulletHitPlayer);

	this.shunt.update();

	var acceleration;
	if (keymap.forward.isDown)
		acceleration = PLAYER_ACCELERATION;
	else
		acceleration = 0;
	this._sprite.body.acceleration.copyFrom(
		game.physics.velocityFromAngle(this._sprite.angle, acceleration)
	);

	var angularVelocity;
	if (keymap.left.isDown)
		angularVelocity = -PLAYER_ANGULAR_VELOCITY;
	else if (keymap.right.isDown)
		angularVelocity = PLAYER_ANGULAR_VELOCITY;
	else
		angularVelocity = 0;
	this._sprite.body.angularVelocity = angularVelocity;

	if (keymap.brake.isDown) {
		this._sprite.body.drag.x = PLAYER_BRAKE_DRAG / Math.sqrt(2);
		this._sprite.body.drag.y = PLAYER_BRAKE_DRAG / Math.sqrt(2);
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
		sound.shoot.play();
		bullet.reset(this._sprite.x, this._sprite.y);
		bullet.rotation = this._sprite.rotation;
		bullet.body.velocity.copyFrom(game.physics.velocityFromAngle(bullet.angle, BULLET_SPEED));
	}
}

Player.prototype.hit = function() {
	this.shields -= 1;
	if (this.shields == 0)
		this.die();
	else {
		sound.hit.play();
		this.shieldRespawnDelay = game.time.now + PLAYER_SHIELD_RESPAWN_DELAY;
		playerEmitter.x = this._sprite.x;
		playerEmitter.y = this._sprite.y;
		playerEmitter.start(true, 2000, null, 3);
	}
}

Player.prototype.die = function() {
	if (this._sprite.alive) {
		this._sprite.kill();
		this._sprite.destroy();
		playerEmitter.x = this._sprite.x;
		playerEmitter.y = this._sprite.y;
		playerEmitter.start(true, 2000, null, 10);
	}
	if (!this._isDead) {
		sound.gameover.play();
		this._gameOverDelay = game.time.now + 1000;
		this._isDead = true;
	}
}

Player.prototype.destroy = function() {
	if (this._sprite.alive) this._sprite.destroy();
}

function enemyBulletHitPlayer(_player, bullet) {
	bullet.kill();
	player.hit();
}
