function EnemyContainer() {
	this._enemies = new Array();
}

EnemyContainer.prototype.addEnemy = function(x, y) {
	var enemy = new Enemy(x, y, this._enemies.length, this);
	this._enemies.push(enemy);
}

EnemyContainer.prototype.addEnemySpawner = function(x, y) {
	var enemySpawner = new EnemySpawner(x, y, this._enemies.length, this);
	this._enemies.push(enemySpawner);
}

EnemyContainer.prototype.removeEnemy = function(id) {
	var enemyToKill = this._enemies[id];
	this._enemies[id] = this._enemies[this._enemies.length - 1];
	this._enemies[id].setId(id);
	this._enemies.pop();
	enemyToKill.die();
}

EnemyContainer.prototype.update = function() {
	for (var i = 0; i < this._enemies.length; ++i)
		this._enemies[i].update();
}

EnemyContainer.prototype.enemyById = function(id) {
	return this._enemies[id];
}

function playerBulletHitEnemy(enemy, bullet) {
	bullet.kill();
	if (enemy.alive) {
		var enemy = enemyContainer.enemyById(enemy.__id);
		enemy.hit();
	}
}
