function EnemySpawner(x, y, id, container) {
	this._sprite = game.add.sprite(x, y, 'enemy-spawner');
	this._sprite.anchor.setTo(0.5, 0.5);
	this._sprite.body.immovable = true;
	this._sprite.body.setSize(32, 32, -8, -8);
	this.setId(id);
	this._isDead = false;
	this._container = container;

	this._nextSpawn = game.time.now + SPAWN_INITIAL_DELAY + Math.random()*SPAWN_VARIANCE;
	this._health = 5;
}

EnemySpawner.prototype.setId = function(id) {
	this._id = id;
	this._sprite.__id = id;
}

EnemySpawner.prototype.update = function() {
	if (this._isDead)
		return;

	game.physics.collide(playerBullets, this._sprite, playerBulletHitEnemy);

	if (game.time.now > this._nextSpawn) {
		if (this._sprite.x>game.camera.x && this._sprite.x<game.camera.x+SCREEN_WIDTH &&
		    this._sprite.y>game.camera.y && this._sprite.y<game.camera.y+SCREEN_HEIGHT)
			sound.spawn.play();
		this._nextSpawn = game.time.now + SPAWN_DELAY + Math.random()*SPAWN_VARIANCE;
		this._container.addEnemy(this._sprite.x, this._sprite.y);
	}
}

EnemySpawner.prototype.die = function() {
	if (!this._isDead) {
		sound.spawnerDeath.play();
		enemyEmitter.x = this._sprite.x;
		enemyEmitter.y = this._sprite.y;
		enemyEmitter.start(true, 2000, null, 20);
		this._isDead = true;
		this._sprite.kill();
		this._sprite.destroy();
	}
}

EnemySpawner.prototype.hit = function() {
	this._health -= 1;
	sound.spawnerHit.play();
	if (this._health) {
		enemyEmitter.x = this._sprite.x;
		enemyEmitter.y = this._sprite.y;
		enemyEmitter.start(true, 2000, null, 5);
		this._nextSpawn = game.time.now + SPAWN_DELAY + Math.random()*SPAWN_VARIANCE;
	} else
		this._container.removeEnemy(this._id);
}
