function Enemy(x, y, id, container) {
	this._sprite = game.add.sprite(x, y, 'enemy');
	this._sprite.anchor.setTo(0.5, 0.5);
	this._sprite.body.maxVelocity.x = 250;
	this._sprite.body.maxVelocity.y = 250;
	this._sprite.body.immovable = true;
	this._sprite.body.setSize(8, 8, -12, -12);
	this._nextFire = 0;
	this.setId(id);
	this._isDead = false;
	this._container = container;
}

Enemy.prototype.setId = function(id) {
	this._id = id;
	this._sprite.__id = id;
}

Enemy.prototype.update = function() {
	var spr = this._sprite;

	if (this._isDead)
		return;

	if (map.getTile(layer.getTileX(spr.x), layer.getTileY(spr.y)) == TILE_EMPTY) {
		this._container.removeEnemy(this._id);
		return;
	}

	game.physics.collide(playerBullets, spr, playerBulletHitEnemy);

	var x = Math.floor(spr.x / 512);
	var y = Math.floor(spr.y / 512);
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (x >= MAP_WIDTH)  x = MAP_WIDTH  - 1;
	if (y >= MAP_HEIGHT) y = MAP_HEIGHT - 1;
	var pspr = player._sprite;
	var px = Math.floor(pspr.x / 512);
	var py = Math.floor(pspr.y / 512);
	var gx, gy;

	var dist = Math.sqrt((pspr.x-spr.x)*(pspr.x-spr.x) + (pspr.y-spr.y)*(pspr.y-spr.y));
	if (dist < 768)
		this.fire();

	var goal = pathFinder.nextStep(x, y, px, py);
	if ((x != px || y != py) && !(px == goal.x && py == gy && dist < 512)) {
		gx = goal.x * 512 + 256;
		gy = goal.y * 512 + 256;
	} else {
		gx = pspr.x;
		gy = pspr.y;
	}

	// I cannot believe this works.
	var a = new Phaser.Point();
	var k = 10;
	var v = spr.body.velocity;
	gx -= spr.x;
	gy -= spr.y;
	a.x = 2 * k * k * gx  -  k * v.x;
	a.y = 2 * k * k * gy  -  k * v.y;
	a.normalize();
	a.x *= 250;
	a.y *= 250;

	var avoidance = new Phaser.Point();
	var minDist = 1000;
	for (var i = 0; i < 16; ++i)
		for (var j = 0; j < 16; ++j) {
			var mapx = Math.floor(spr.x / 32) - 8 + i;
			var mapy = Math.floor(spr.y / 32) - 8 + j;
			if (mapx < 0) continue;
			if (mapy < 0) continue;
			if (mapx >= MAP_WIDTH * 16) continue;
			if (mapy >= MAP_HEIGHT * 16) continue;
			if (map.getTile(mapx, mapy) == TILE_EMPTY) {
				var dx = spr.x - (mapx * 32 + 16);
				var dy = spr.y - (mapy * 32 + 16);
				var dist = Math.sqrt(dx*dx + dy*dy);
				if (dist < minDist)
					minDist = dist;
				dist *= dist;
				avoidance.x += 1000/dist * dx;
				avoidance.y += 1000/dist * dy;
			}
		}
	a.x += avoidance.x;
	a.y += avoidance.y;

	spr.body.acceleration.copyFrom(a);
	var goal = new Phaser.Point(spr.x + a.x, spr.y + a.y);

	spr.rotation = game.physics.angleBetween(spr, goal);
}

Enemy.prototype.die = function() {
	if (!this._isDead) {
		enemyEmitter.x = this._sprite.x;
		enemyEmitter.y = this._sprite.y;
		enemyEmitter.start(true, 2000, null, 10);
		this._isDead = true;
		this._sprite.kill();
	}
}

Enemy.prototype.fire = function() {
	if (game.time.now > this._nextFire) {
		var bullet = enemyBullets.getFirstExists(false);
		if (bullet == null)
			return;
		bullet.reset(this._sprite.x, this._sprite.y);
		bullet.rotation = this._sprite.rotation;
		bullet.body.velocity.copyFrom(game.physics.velocityFromAngle(bullet.angle, 500));
		this._nextFire = game.time.now + 750;
	}
}

Enemy.prototype.hit = function() {
	this._container.removeEnemy(this._id);
}
